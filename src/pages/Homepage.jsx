import React, { useContext, useState, useEffect } from 'react';
import { callGemini } from '../utils/apiCall';
import '../index.css';
import { Grid, TextField, Button } from '@mui/material';
import { Quiz } from '../components/Quiz';
import { getPrompt } from '../data/prompts';
import { AppContext } from '../context/AppContext';
import { formatJSONResponse } from '../utils/format';

export const Homepage = () => {
    const { 
        quizItems,
        setQuizItems,
        setSelectedItems
     } = useContext(AppContext);

    const [prompt, setPrompt] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [displayReset, setDisplayReset] = useState(false);

    useEffect(() => {
        if (quizItems.length > 0) setDisplayReset(true);
    }, [quizItems])

    const handleClick = (ev) => {
        ev.preventDefault();

        if (prompt === '') return;

        setIsLoading(true);
        callGemini(getPrompt(prompt)).then((resText) => {
            console.log(resText);
            return resText;
        }).then((data) => {
            setSelectedItems({});
            setQuizItems(formatJSONResponse(data));
            setIsLoading(false);
            setDisplayReset(true);
        });
    }
  return (
    <Grid container spacing={1}>
        <Grid size={12} className='chatWrapper'>
            <form onSubmit={handleClick}>
                <TextField className='chatWrapper-textfield' value={prompt} label="Enter a topic" variant="outlined" name='prompt' onChange={(ev) => setPrompt(ev.target.value)} />
                <Button type='submit' style={{backgroundColor: '#3A59D1', borderRadius: '5px', padding: '15px', marginTop: '10px', color: '#FFF'}}>Generate Quiz</Button>
            </form>
            <br />
            {isLoading ? <p>Loading Quiz...</p> : <Quiz displayReset={displayReset} quizItems={quizItems} /> }
        </Grid>
    </Grid>
  )
}
