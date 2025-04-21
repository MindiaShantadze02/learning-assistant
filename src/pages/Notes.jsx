import React, { useState } from 'react'
import { Grid, TextField, Button } from '@mui/material'
import { createNotes } from '../data/prompts';
import { callGemini } from '../utils/apiCall';

export const Notes = () => {
    const [notes, setNotes] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [prompt, setPrompt] = useState('');
    const handleSubmit = (ev) => {
      ev.preventDefault();

      if (prompt === '') return;

      setIsLoading(true);
      callGemini(createNotes(prompt)).then((resText) => {
          return resText;
      }).then((data) => {
        console.log(data);
        setNotes(data);
        setIsLoading(false);
      });
  }
  return (
    <Grid container spacing={1}>
        <Grid size={12} className='chatWrapper'>
            <form onSubmit={handleSubmit}>
                <TextField className='chatWrapper-textfield' value={prompt} label="Enter a topic" variant="outlined" name='prompt' onChange={(ev) => setPrompt(ev.target.value)} />
                <Button type='submit' style={{backgroundColor: '#FFD63A', borderRadius: '5px', padding: '15px', marginTop: '10px', color: '#FFF'}}>Generate Notes</Button>
            </form>
            <div>
                {isLoading ? <p>Loading...</p> : <pre>{notes}</pre>}
            </div>
        </Grid>
    </Grid>
  )
}
