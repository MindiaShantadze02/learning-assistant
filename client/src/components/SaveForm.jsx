import React from 'react'
import {
    FormLabel,
    TextField,
    Typography
} from '@mui/material';
import { QuizModal } from './QuizModal';
import { useQuizModal } from '../hooks/useQuizModal';
import { useQuizAPI } from '../hooks/useQuizAPI';

import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

export const SaveForm = ({ openQuizModal, handleClose }) => {
    const {
        quizItems
    } = useContext(AppContext);

    const {
      title,
      setTitle,

      category,
      setCategory,

      resetModal
    } = useQuizModal();

    const { saveQuiz } = useQuizAPI();

    const handleConfirm = async () => {
        try {
          const res = await saveQuiz({ title, category, quizData: quizItems })
          console.log(res);
          resetModal();
        } catch(err) {
          console.log(err);
        }
    }

  return (
    <QuizModal openQuizModal={openQuizModal} handleClose={handleClose} handleConfirm={handleConfirm}>
        <Typography variant='h5'>Do you want to save the quiz?</Typography>
        <FormLabel id="outlined-basic">Category</FormLabel>
        <TextField
            className='quizItem-input'
            name='category'
            id="outlined-basic"
            variant="outlined"
            onChange={(ev) => setCategory(ev.target.value)}
            value={category}
        />
        <br />
        <FormLabel id="outlined-basic">Title</FormLabel>
            <TextField
            className='quizItem-input'
            name='title'
            id="outlined-basic"
            variant="outlined"
            onChange={(ev) => setTitle(ev.target.value)}
            value={title}
        />
      </QuizModal>
  )
}
