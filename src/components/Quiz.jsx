import React, { useState, useCallback } from 'react';
import { List, ListItem, Button } from '@mui/material';
import { Input } from './Input';
import { formatJSONResponse } from '../utils/format';

export const Quiz = ({ chatData, displayReset }) => {
  const [formData, setFormData] = useState(formatJSONResponse(chatData));
  const [correctCount, setCorrectCount] = useState(0);
  const [selectedItems, setSelectedItems] = useState({});
  const [resetBackgrounds, setResetBackgrounds] = useState(0);

  const resetQuiz = useCallback(() => {
    setSelectedItems({});
    setCorrectCount(0);
    setFormData(formatJSONResponse(chatData));
    setResetBackgrounds(prev => prev + 1);
  }, [chatData]);

  return (
    <div>
    { displayReset && (
      <Button 
        onClick={resetQuiz}
        style={{backgroundColor: '#BF3131', borderRadius: '5px', padding: '15px', marginTop: '10px', color: '#FFF'}}
      >Reset</Button>) }
      <List className='chatWrapper-quiz'>
        {formData.map((formItem) => (
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
      {formData.length > 0 && <h2>Score: {correctCount}/{formData.length}</h2>}
    </div>
    
  )
}
