import React from 'react';
import { InputSelect } from './Input/InputSelect/InputSelect';
import { InputText } from './Input/InputText/InputText';

export const Input = ({ quizItem, inputType }) => {
  const inputComponents = {
    radio: <InputSelect quizItem={quizItem}/>,
    text: <InputText quizItem={quizItem} />
  };

  return inputComponents[inputType.toLowerCase()];
}
