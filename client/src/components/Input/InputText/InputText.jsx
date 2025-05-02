import React from "react";
import { useInput } from "../../../hooks/useInput";
import { FormLabel, TextField } from "@mui/material";

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
        <TextField
          className="quizItem-input"
          id="outlined-basic"
          variant="outlined"
          onChange={(ev) => setUserAnswer(ev.target.value)}
          value={userAnswer}
        />
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
