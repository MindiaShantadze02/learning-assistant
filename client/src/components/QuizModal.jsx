import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#fff',
  borderRadius: '8px',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
  alignItems: 'center',
};

export const QuizModal = ({ openQuizModal, handleClose, handleConfirm, children }) => {
  return (
    <Modal
        open={openQuizModal}
        onClose={handleClose}
        >
        <Box sx={modalStyle}>
        {children}
        
        <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleConfirm}
          >
            Confirm
          </Button>
          <Button 
            variant="outlined" 
            color="secondary" 
            onClick={handleClose}
          >
            Close
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}
