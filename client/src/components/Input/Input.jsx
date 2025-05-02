import React from 'react';
import { InputSelect } from './InputSelect/InputSelect';
import { InputText } from './InputText/InputText';

export const Input = ({ quizItem, inputType }) => {
  const inputComponents = {
    radio: <InputSelect quizItem={quizItem}/>,
    text: <InputText quizItem={quizItem} />
  };

  return inputComponents[inputType.toLowerCase()];
}
