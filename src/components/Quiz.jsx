import React, { useState } from 'react';
import { List, ListItem } from '@mui/material';
import { Input } from './Input';
import { formatJSONResponse } from '../utils/format';

export const Quiz = ({ chatData }) => {
  const [formData, setFormData] = useState(formatJSONResponse(chatData));
  const [correctCount, setCorrectCount] = useState(0);
  const [selectedItems, setSelectedItems] = useState({});

  return (
    <div>
      <List className='chatWrapper-quiz'>
        {formData.map((formItem) => (
          <ListItem key={formItem.id}>
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
      {formData.length > 0 && <h2>Score: {correctCount}/{formData.length}</h2>}
    </div>
    
  )
}
