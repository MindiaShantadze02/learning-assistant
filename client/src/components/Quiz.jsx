import React, { useState, useCallback, useContext, useEffect } from 'react';
import { List, ListItem, Button, TextField, FormLabel } from '@mui/material';
import {
  Input
} from './Input';
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
    setCorrectCount
  } = useContext(AppContext);

  const [resetBackgrounds, setResetBackgrounds] = useState(0);

  const {
    openQuizModal,
    handleOpen,
    handleClose,
  } = useQuizModal();


  const resetQuiz = useCallback(() => {
    setSelectedItems({});
    setCorrectCount(0);
    setResetBackgrounds(prev => prev + 1);
  }, [quizItems]);

  return (
    <div>
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
          <ListItem key={formItem.id} className='quizItem'>
            <Input 
              quizItem={formItem}
              setCorrectCount={setCorrectCount}
              selectedItems={selectedItems}
              setSelectedItems={setSelectedItems}
              inputType={formItem.type}
              resetBackgrounds={resetBackgrounds}
            />
          </ListItem>
        ))}
      </List>
      <SaveForm handleClose={handleClose} openQuizModal={openQuizModal} />
      {quizItems.length > 0 && <h2>Score: {correctCount}/{quizItems.length}</h2>}
    </div>
    
  )
}
