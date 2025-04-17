import React, { useState } from 'react';
import { callGemini } from '../utils/apiCall';
import '../index.css';
import { Grid, TextField, Button } from '@mui/material';

export const Homepage = () => {
    const [chatData, setChatData] = useState("");

    const handleClick = () => {
        callGemini('why do humans drink water? respond in html format (excluding all the tags except the ones displaying on the page)').then((resText) => {
            return resText;
        }).then((data) => {
            setChatData(data);
        })
    }
  return (
    <Grid container spacing={1}>
  <Grid size={3}>
    <div className='item'>size=8</div>
  </Grid>
  <Grid size={9} className='chatWrapper'>
        <TextField className='chatWrapper-textfield' label="Outlined" variant="outlined" />
        <Button onClick={handleClick}>Click here</Button>
        {chatData}
  </Grid>
</Grid>
  )
}
