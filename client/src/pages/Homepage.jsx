import React, { useContext, useState, useEffect } from 'react';
import { callGemini } from '../utils/apiCall';
import '../index.css';
import { Grid, TextField, Button } from '@mui/material';
import { Quiz } from '../components/Quiz';
import { getPrompt } from '../data/prompts';
import { AppContext } from '../context/AppContext';
import { formatJSONResponse } from '../utils/format';
import { Topics } from '../components/Topics';
import { v4 as uuid } from 'uuid';

export const Homepage = () => {
    const { 
        quizItems,
        setQuizItems,
        setSelectedItems,
        categories,
        setCategories
     } = useContext(AppContext);

    const [prompt, setPrompt] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [displayReset, setDisplayReset] = useState(false);
    const [displaySave, setDisplaySave] = useState(false);

    useEffect(() => {
        fetch('http://localhost:3001/categories').then((res) => {
            return res.json();
        }).then((data) => {
            setCategories(data)
        })

        if (quizItems.length > 0) {
            setDisplayReset(true);
            setDisplaySave(true);
        };
    }, [quizItems])


    const handleClick = (ev) => {
        ev.preventDefault();

        if (prompt === '') return;

        setIsLoading(true);
        callGemini(getPrompt(prompt)).then((resText) => {
            return resText;
        }).then((data) => {
            setSelectedItems({});
            const formattedData = formatJSONResponse(data).map((quizItem) => {
                const newQuizItem = {...quizItem};
                quizItem.id = uuid;

                return newQuizItem
            });
            
            setQuizItems(formattedData);
            setIsLoading(false);
            setDisplayReset(true);
        });
    }

  return (
    <Grid spacing={1} container>
        <Grid size={2} style={{padding: '15px', backgroundColor: 'lightblue'}} className='chatWrapper'>
              {
                categories.map((category) => (
                    <div>
                        <li>{category}</li>
                        <Topics categoryName={category} />
                    </div>
                ))
              }
          </Grid>
          <Grid size={10} className='chatWrapper'>
        <form onSubmit={handleClick}>
            <TextField className='chatWrapper-textfield' value={prompt} label="Enter a topic" variant="outlined" name='prompt' onChange={(ev) => setPrompt(ev.target.value)} />
            <Button type='submit' style={{backgroundColor: '#3A59D1', borderRadius: '5px', padding: '15px', marginTop: '10px', color: '#FFF'}}>Generate Quiz</Button>
        </form>
        <br />
        {isLoading ? <p>Loading Quiz...</p> : <Quiz displaySave={displaySave} displayReset={displayReset} quizItems={quizItems} /> }
    </Grid>
    </Grid>
  )
}
