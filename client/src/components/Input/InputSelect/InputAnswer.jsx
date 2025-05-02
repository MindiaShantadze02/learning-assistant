import React, { useContext } from 'react';
import { FormControlLabel, Radio } from '@mui/material';
import { AppContext } from '../../../context/AppContext';

export const InputAnswer = ({ answer, quizItem, handleAnswerSelection }) => {
  const { selectedItems } = useContext(AppContext);
  return (
    <>
        <FormControlLabel 
            value={answer}
            checked={
                selectedItems[quizItem.id]?.value &&
                selectedItems[quizItem.id].value === answer 
            }
            disabled={selectedItems[quizItem.id] ? true : false} 
            control={<Radio />} 
            label={answer} 
            onChange={handleAnswerSelection}
        />
    </>

  )
}
