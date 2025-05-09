import React from "react";
import { useInput } from "../../../hooks/useInput";
import { FormLabel, TextField, Button, Box, TextareaAutosize } from "@mui/material";

export const InputText = ({ quizItem }) => {
    const {
        textBackgroundColor,
        setUserAnswer,
        userAnswer,
        aiReview,
        reviewLoading,
        handleAnswerSubmition
    } = useInput(quizItem);

  return (
    <div className='input-text-wrapper'
      style={{ backgroundColor: textBackgroundColor }}
    >
      <form onSubmit={handleAnswerSubmition}>
        <FormLabel id="outlined-basic">{quizItem.title}</FormLabel>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start', mt: 1 }}>
          <TextareaAutosize
            className='quizItem-input'
            aria-label="user-answer"
            onChange={(ev) => setUserAnswer(ev.target.value)}
            minRows={3}
            placeholder="Type your answer here..."
            style={{ width: 200 }}
            disabled={!!aiReview}
          />
          <Button 
            type="submit" 
            variant="contained" 
            disabled={!userAnswer || !!aiReview}
            sx={{ 
              backgroundColor: '#48A6A7',
              '&:hover': {
                backgroundColor: '#3d8b8c'
              }
            }}
          >
            Submit
          </Button>
        </Box>
      </form>
      <br />
      {reviewLoading && <p>Review Loading...</p>}
      {aiReview && !reviewLoading && (
        <>
          <p>{aiReview}</p>
          <br />
          <b>Correct answer: {quizItem.correctAnswer}</b>
        </>
      )}
    </div>
  );
};
