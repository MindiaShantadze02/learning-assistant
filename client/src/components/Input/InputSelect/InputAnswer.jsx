import React, { useContext } from "react";
import { FormControlLabel, Radio } from "@mui/material";
import { AppContext } from "../../../context/AppContext";

export const InputAnswer = ({ answer, quizItem, handleAnswerSelection }) => {
  const { selectedItems } = useContext(AppContext);

  const isSelected = selectedItems[quizItem.id]?.value === answer;
  const isDisabled = !!selectedItems[quizItem.id];

  return (
    <FormControlLabel
      value={answer}
      control={
        <Radio
          checked={isSelected}
          onChange={handleAnswerSelection}
          disabled={isDisabled}
        />
      }
      label={answer}
    />
  );
};
