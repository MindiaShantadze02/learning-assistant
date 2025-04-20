import React, { useState } from 'react';
import { callGemini } from '../utils/apiCall';
import '../index.css';
import { Grid, TextField, Button } from '@mui/material';
import { Quiz } from '../components/Quiz';
import { getPrompt } from '../data/prompts';

export const Homepage = () => {
    const [chatData, setChatData] = useState('');
    const [prompt, setPrompt] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleClick = (ev) => {
        ev.preventDefault();

        if (prompt === '') return;

        setIsLoading(true);
        callGemini(getPrompt(prompt)).then((resText) => {
            return resText;
        }).then((data) => {
            setChatData(data);
            setIsLoading(false);
        });
    }
  return (
    <Grid container spacing={1}>
        <Grid size={12} className='chatWrapper'>
            <form onSubmit={handleClick}>
                <TextField className='chatWrapper-textfield' value={prompt} label="Enter a topic" variant="outlined" name='prompt' onChange={(ev) => setPrompt(ev.target.value)} />
                <Button type='submit' style={{backgroundColor: '#BF3131', borderRadius: '5px', padding: '15px', marginTop: '10px', color: '#FFF'}}>Generate Quiz</Button>
            </form>
            <br />
            {isLoading ? <p>Loading Quiz...</p> : <Quiz chatData={chatData} /> }
        </Grid>
    </Grid>
  )
}
