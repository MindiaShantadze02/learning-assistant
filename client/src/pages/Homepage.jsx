import React, { useContext, useState, useEffect } from 'react';
import { callGemini } from '../utils/apiCall';
import '../index.css';
import { Grid, TextField, Button, Typography } from '@mui/material';
import { Quiz } from '../components/Quiz';
import { getPrompt } from '../data/prompts';
import { AppContext } from '../context/AppContext';
import { formatJSONResponse } from '../utils/format';
import { Topics } from '../components/Topics';
import { v4 as uuid } from 'uuid';
import { useQuizAPI } from '../hooks/useQuizAPI';

export const Homepage = () => {
    const { 
        quizItems,
        setQuizItems,
        setSelectedItems,
        categories,
        setCategories
     } = useContext(AppContext);

     const { fetchCategories } = useQuizAPI();

    const [prompt, setPrompt] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [displayReset, setDisplayReset] = useState(false);
    const [displaySave, setDisplaySave] = useState(false);

    useEffect(() => {
        fetchCategories().then((categories) => {
            setCategories(categories);
        });

        if (quizItems.length > 0) {
            setDisplayReset(true);
            setDisplaySave(true);
          }
    }, [quizItems]);


    const handleClick = async (ev) => {
        ev.preventDefault();

        if (prompt === '') return;

        setIsLoading(true);
        callGemini(getPrompt(prompt)).then((resText) => {
            return resText;
        }).then((data) => {
            setSelectedItems({});
            const formattedData = formatJSONResponse(data).map((quizItem) => {
                const newQuizItem = {...quizItem};
                quizItem.id = uuid();

                return newQuizItem
            });
            
            setQuizItems(formattedData);
            setIsLoading(false);
            setDisplayReset(true);
        });
    }

  return (
    <Grid spacing={1} container>
        <Grid size={3} style={{padding: '15px', height: '100vh', backgroundColor: '#F1F1F1'}} className='chatWrapper'>
            <Typography variant='h5' style={{ marginTop: '40px', marginBottom: '10px' }}>Topics</Typography>
              {
                categories.map((category) => (
                    <div>
                        <Typography marginLeft='20px'>{category}</Typography>
                        <Topics categoryName={category} />
                    </div>
                ))
              }
          </Grid>
          <Grid size={9} className='chatWrapper'>
        <form onSubmit={handleClick}>
            <div style={{ margin: 'auto', width: '90%', marginTop: '100px' }}>
                <Typography variant='h2'>Generate Quiz</Typography>
                <TextField className='chatWrapper-textfield' value={prompt} label="Enter a topic" variant="outlined" name='prompt' onChange={(ev) => setPrompt(ev.target.value)} />
                <Button type='submit' style={{backgroundColor: '#48A6A7', borderRadius: '5px', padding: '15px', marginTop: '10px', color: '#FFF'}}>Generate Quiz</Button>
            </div>
        </form>
        <br />
        {isLoading ? <p>Loading Quiz...</p> : <Quiz displaySave={displaySave} displayReset={displayReset} quizItems={quizItems} /> }
    </Grid>
    </Grid>
  )
}
