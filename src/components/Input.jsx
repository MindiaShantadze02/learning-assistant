import React, { useState } from 'react';
import {
    FormControl,
    RadioGroup,
    Radio,
    FormControlLabel,
    TextField,
    FormLabel
} from '@mui/material';

export const Input = ({ quizItem, inputType, setCorrectCount, selectedItems, setSelectedItems }) => {
    const [backgroundColor, setBackgroundColor] = useState('#EEEEEE');
    
    const handleAnswerSelection = (ev) => {
      ev.preventDefault();
      if (ev.target.value === '') return;

      console.log(quizItem);
      if (selectedItems[quizItem.id]) return;
      else {
        if (ev.target.value.trim() === quizItem.correctAnswer.trim()) {
          setBackgroundColor('#1DCD9F')
          setCorrectCount(prev => prev + 1);  
        } else {
          setBackgroundColor('#E52020')
        }

        const updatedSelectedItems = {...selectedItems};
        updatedSelectedItems[quizItem.id] = true;
        setSelectedItems(updatedSelectedItems);
      }
    }

    const handleAnswerSubmition = (ev) => {
      
    }
  
    inputType = inputType.toLowerCase();

    if (inputType === 'radio') {
        return (
          <FormControl style={{ padding: '50px', borderRadius: '5px', width: "100%", backgroundColor }} >
            <FormLabel id="demo-radio-buttons-group-label">{quizItem.title}</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              name="radio-buttons-group"
            >
              {quizItem.answers.map((answer, i) =>
                  <FormControlLabel value={answer} control={<Radio />} label={answer} onChange={handleAnswerSelection} key={i} />
              )}
            </RadioGroup>
          </FormControl>
        )
    } else if (inputType === 'text') {
        return (
          <form onSubmit={handleAnswerSubmition}>
              <FormLabel id="outlined-basic">{quizItem.title}</FormLabel>
              <TextField className='quizItem-input' id="outlined-basic" variant="outlined" value={quizItem.title} />
          </form>
        )
    }
}
