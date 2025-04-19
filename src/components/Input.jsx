import React from 'react';
import {
    FormControl,
    RadioGroup,
    Radio,
    FormControlLabel,
    TextField,
    FormLabel
} from '@mui/material';

export const Input = ({ quizItem, inputType }) => {
    inputType = inputType.toLowerCase();

    if (inputType === 'radio') {
        return <FormControl>
        <FormLabel id="demo-radio-buttons-group-label">{quizItem.title}</FormLabel>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          name="radio-buttons-group"
        >
          {quizItem.answers.map(answer => 
            <FormControlLabel value={answer} control={<Radio />} label={answer} />
          )}
        </RadioGroup>
      </FormControl>
    } else if (inputType === 'text') {
        return <div>
          <FormLabel id="outlined-basic">{quizItem.title}</FormLabel>
          <TextField className='quizItem-input' id="outlined-basic" variant="outlined" />
        </div>
    }
}
