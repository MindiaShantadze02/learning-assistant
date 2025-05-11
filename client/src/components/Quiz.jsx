import React, { useState, useCallback, useContext, useEffect } from 'react';
import { List, ListItem, Button, TextField, FormLabel } from '@mui/material';
import { v4 as uuid } from 'uuid';
import {
  Input
} from './Input/Input';
import { 
  AppContext
} from '../context/AppContext';
import { useQuizModal } from '../hooks/useQuizModal';
import { SaveForm } from './SaveForm';

export const Quiz = ({ quizItems }) => {
  const {
    selectedItems,
    correctCount,
    setSelectedItems,
    setCorrectCount,
    resetQuiz
  } = useContext(AppContext);

  const {
    openQuizModal,
    handleOpen,
    handleClose
  } = useQuizModal();

  return (
    <div style={{ margin: 'auto', width: '90%' }}>
      {
        quizItems.length > 0 && (
          <>
            <Button className='button button-reset' onClick={resetQuiz}>Reset</Button>
            <Button className='button button-save' onClick={handleOpen}>Save Quiz</Button>
          </>
        )
      }
      <List className='chatWrapper-quiz'>
        {quizItems.map((formItem) => (
          <ListItem key={formItem.id} className='quizItem' data-test='divQuizItem'>
            <Input 
              quizItem={formItem}
              setCorrectCount={setCorrectCount}
              selectedItems={selectedItems}
              setSelectedItems={setSelectedItems}
              inputType={formItem.type}
            />
          </ListItem>
        ))}
      </List>
      <SaveForm handleClose={handleClose} openQuizModal={openQuizModal} />
      {quizItems.length > 0 && <h2>Score: {correctCount}/{quizItems.length}</h2>}
    </div>
    
  )
}
