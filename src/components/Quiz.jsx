import React from 'react';
import { List, ListItem, Button } from '@mui/material';
import { Input } from './Input';
import { formatJSONResponse } from '../utils/format';

export const Quiz = ({ chatData }) => {
  const formData = formatJSONResponse(chatData);
  return (
    <List className='chatWrapper-quiz'>
      {formData.map((formItem) => (
        <ListItem>
          <Input quizItem={formItem} inputType={formItem.type} />
        </ListItem>
      ))}
    </List>
  )
}
