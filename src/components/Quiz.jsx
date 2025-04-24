import React, { useState, useCallback, useContext } from 'react';
import { List, ListItem, Button } from '@mui/material';
import { Input } from './Input';
import { 
  AppContext
} from '../context/AppContext';

export const Quiz = ({ quizItems, displayReset }) => {
  const {
    state
  } = useContext(AppContext);
  const [correctCount, setCorrectCount] = useState(0);
  const [selectedItems, setSelectedItems] = useState({});
  const [resetBackgrounds, setResetBackgrounds] = useState(0);

  const resetQuiz = useCallback(() => {
    setSelectedItems({});
    setCorrectCount(0);
    setFormData(formatJSONResponse(quizItems));
    setResetBackgrounds(prev => prev + 1);
  }, [quizItems]);

  return (
    <div>
    { displayReset && (
      <Button 
        onClick={resetQuiz}
        style={{backgroundColor: '#BF3131', borderRadius: '5px', padding: '15px', marginTop: '10px', color: '#FFF'}}
      >Reset</Button>) }
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
      {quizItems.length > 0 && <h2>Score: {correctCount}/{quizItems.length}</h2>}
    </div>
    
  )
}
