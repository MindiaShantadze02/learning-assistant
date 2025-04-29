import React, { useState, useCallback, useContext, useEffect } from 'react';
import { List, ListItem, Button, TextField, FormLabel } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import {
  Input
} from './Input';
import { 
  AppContext
} from '../context/AppContext';
import { QuizModal } from './QuizModal';

export const Quiz = ({ quizItems, displayReset, displaySave }) => {
  const {
    selectedItems,
    correctCount,
    setSelectedItems,
    setCorrectCount
  } = useContext(AppContext);

  const [resetBackgrounds, setResetBackgrounds] = useState(0);
  const [openQuizModal, setOpenQuizModal] = useState(false);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');

  const resetQuiz = useCallback(() => {
    setSelectedItems({});
    setCorrectCount(0);
    setResetBackgrounds(prev => prev + 1);
  }, [quizItems]);

  const saveQuiz = () => {
    setOpenQuizModal(true);
  }

  const handleClose = () => {
    setOpenQuizModal(false);
  }

  const handleConfirm = () => {
      fetch('http://localhost:3001/quizes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title,
            category,
            quizData: quizItems
        })
    }).then((res) => {
        console.log(res);
        return res.json();
    }).then((data) => {
        console.log(data);
        return data;
    }).catch(err => {
        console.log(err);
    })
  }

  return (
    <div>
    { displayReset && (
      <Button 
        onClick={resetQuiz}
        style={{backgroundColor: '#BF3131', borderRadius: '5px', padding: '15px', marginTop: '10px', color: '#FFF'}}
      >Reset</Button>) }
      { displaySave && (
        <Button 
          onClick={saveQuiz}
          style={{backgroundColor: 'yellow', borderRadius: '5px', padding: '15px', marginTop: '10px', color: 'black', marginLeft: '20px'}}
        >Save Quiz</Button>) }
      <List className='chatWrapper-quiz'>
        {quizItems.map((formItem) => (
          <ListItem key={formItem.id}>
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
      <QuizModal openQuizModal={openQuizModal} handleClose={handleClose} handleConfirm={handleConfirm}>
                <FormLabel id="outlined-basic">Category</FormLabel>
                <TextField
                  className='quizItem-input'
                  id="outlined-basic"
                  variant="outlined"
                  onChange={(ev) => setTitle(ev.target.value)} 
                  value={title}
                />
                <br />
                <FormLabel id="outlined-basic">Title</FormLabel>
                <TextField
                  name='category'
                  className='quizItem-input'
                  id="outlined-basic"
                  variant="outlined"
                  onChange={(ev) => setCategory(ev.target.value)} 
                  value={category}
                />
      </QuizModal>
      {quizItems.length > 0 && <h2>Score: {correctCount}/{quizItems.length}</h2>}
    </div>
    
  )
}
