import React, { useState, useEffect, useContext } from 'react';
import {
    FormControl,
    RadioGroup,
    Radio,
    FormControlLabel,
    TextField,
    FormLabel
} from '@mui/material';
import { callGemini } from '../utils/apiCall';
import { reviewAnswer } from '../data/prompts';
import { formatJSONResponse } from '../utils/format';
import { AppContext } from '../context/AppContext';

export const Input = ({ quizItem, inputType, setCorrectCount, selectedItems, setSelectedItems, resetBackgrounds }) => {
    const [backgroundColor, setBackgroundColor] = useState('#EEEEEE');
    const [textBackgroundColor, setTextBackgroundColor] = useState('#EEEEEE');
    const [userAnswer, setUserAnswer] = useState('');
    const [aiReview, setAiReview] = useState('');
    const [reviewLoading, setReviewLoading] = useState(false);
    const [radioValue, setRadioValue] = useState('');

    const {
      correctCount
    } = useContext(AppContext);
    
    useEffect(() => {
        if (resetBackgrounds) {
            setBackgroundColor('#EEEEEE');
            setTextBackgroundColor('#EEEEEE');
            setUserAnswer('');
            setAiReview('');
            setReviewLoading(false);
            setRadioValue('');
        }

        if (!selectedItems[quizItem.id]) setBackgroundColor('#EEEEEE')
        else if (selectedItems[quizItem.id].isCorrect) setBackgroundColor('#1DCD9F')
        else setBackgroundColor('#E52020');
    }, [resetBackgrounds]);

    const handleAnswerSelection = (ev) => {
      ev.preventDefault();
      if (ev.target.value === '') return;
      
      setRadioValue(ev.target.value);
      
      if (selectedItems[quizItem.id]) {
        const wasCorrect = selectedItems[quizItem.id].isCorrect;
        if (wasCorrect) {
          setCorrectCount(correctCount => correctCount - 1);
        }
      }

      if (ev.target.value.trim() === quizItem.correctAnswer.trim()) {
        setBackgroundColor('#1DCD9F')
        setCorrectCount(correctCount + 1);
      } else {
        setBackgroundColor('#E52020')
      }

      const updatedSelectedItems = {...selectedItems};
      updatedSelectedItems[quizItem.id] = {
        value: ev.target.value,
        isCorrect: ev.target.value.trim() === quizItem.correctAnswer.trim()
      };
      setSelectedItems(updatedSelectedItems);
    }

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
        } else if (score > 0 && score < 1) {
          setTextBackgroundColor("#FAFFC5");
        } else if (score === 0) {
          setTextBackgroundColor('#E52020');
        }

        setCorrectCount(correctCount => correctCount + score);
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
              value={radioValue}
            >
              {quizItem.answers.map((answer, i) =>
                  <FormControlLabel 
                    value={answer}
                    disabled={selectedItems[quizItem.id] ? true : false} 
                    control={<Radio />} 
                    label={answer} 
                    onChange={handleAnswerSelection} 
                    key={i} 
                  />
              )}
            </RadioGroup>
            { selectedItems[quizItem.id] && <p style={{fontWeight: "700"}}>Correct answer: {quizItem.correctAnswer}</p>} 
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
