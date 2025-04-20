import React, { useState } from 'react';
import {
    FormControl,
    RadioGroup,
    Radio,
    FormControlLabel,
    TextField,
    FormLabel,
    Grid
} from '@mui/material';
import { callGemini } from '../utils/apiCall';
import { reviewAnswer } from '../data/prompts';
import { formatJSONResponse } from '../utils/format';

export const Input = ({ quizItem, inputType, setCorrectCount, selectedItems, setSelectedItems }) => {
    const [backgroundColor, setBackgroundColor] = useState('#EEEEEE');
    const [textBackgroundColor, setTextBackgroundColor] = useState('#EEEEEE');
    
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

    const [userAnswer, setUserAnswer] = useState('');
    const [aiReview, setAiReview] = useState('');
    const [reviewLoading, setReviewLoading] = useState(false);
    const handleAnswerSubmition = (ev) => {
      ev.preventDefault();

      if (userAnswer === '') return;
      else if (selectedItems[quizItem.id]) return false;
      setReviewLoading(true);
      callGemini(reviewAnswer(quizItem.title, userAnswer)).then((reviewData) => {
        return reviewData;
      }).then((data) => {
        setReviewLoading(false);
        const review = formatJSONResponse(data);
        const score = Number(review.score);

        if (score === 1) {
          setTextBackgroundColor('#1DCD9F');
        } else if (score === 0.5) {
          setTextBackgroundColor("#FAFFC5");
        } else if (score === 0) {
          setTextBackgroundColor('#E52020');
        }

        setCorrectCount(prev => prev + score);
        setAiReview(review.review);
        const updatedSelectedItems = {...selectedItems};
        updatedSelectedItems[quizItem.id] = true;
        setSelectedItems(updatedSelectedItems);
      });
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
          <div style={{ backgroundColor: textBackgroundColor, padding: '20px', borderRadius: '5px', margin: "20px 0 20px 0", width: '100%' }}>
            <form onSubmit={handleAnswerSubmition}>
                <FormLabel id="outlined-basic">{quizItem.title}</FormLabel>
                <TextField
                  className='quizItem-input'
                  id="outlined-basic"
                  variant="outlined"
                  onChange={(ev) => setUserAnswer(ev.target.value)} 
                  value={userAnswer}
                />
            </form>
            <br />
            {reviewLoading && (
              <p>Review Loading...</p>
            )}
            {aiReview && !reviewLoading &&
              (<>
                <p>{aiReview}</p>
                <br />
                <p style={{fontWeight: "700"}}>Correct answer: {quizItem.correctAnswer}</p>
              </>
              )
            }
          </div>
        )
    }
}
