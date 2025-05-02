import React, { useContext } from "react";
import {
    FormControl,
    FormLabel,
    RadioGroup
} from "@mui/material";
import { InputAnswer } from "./InputAnswer";
import { useInput } from "../../../hooks/useInput";
import { AppContext } from "../../../context/AppContext";

export const InputSelect = ({ quizItem }) => {
    const { selectedItems } = useContext(AppContext);

    const {
        backgroundColor,
        handleAnswerSelection,
        radioValue
    } = useInput(quizItem);

  return (
    <FormControl className="input-radio" style={{ backgroundColor }}>
      <FormLabel id="demo-radio-buttons-group-label">
        {quizItem.title}
      </FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        name="radio-buttons-group"
        value={radioValue}
      >
        {quizItem.answers.map((answer) => (
          <InputAnswer answer={answer} quizItem={quizItem} handleAnswerSelection={handleAnswerSelection} />
        ))}
      </RadioGroup>
      {selectedItems[quizItem.id] && (
        <b>Correct answer: {quizItem.correctAnswer}</b>
      )}
    </FormControl>
  );
};
