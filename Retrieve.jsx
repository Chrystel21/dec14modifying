import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from '@mui/material';
import Modal from '@mui/material/Modal'
import './styles.css'

const Retrieve = ({ contact, isOpen, onClose, id }) => {
  if(!contact){
    return null;
  }

  return (
    <Modal open={isOpen} onClose={onClose}>
      <div className='modal-container'>
      <Typography variant='h6'> Contact Details </Typography>
      <Typography>ID: {contact.id}</Typography>
      <Typography>Full Name: {contact?.fullName}</Typography>
        <Typography>Email: {contact?.emailAddress}</Typography>
        <Typography>Contact Number: {contact?.contactNumber}</Typography>
        <Typography>Location: {contact?.location}</Typography>
        <Typography>Registered Date: {contact?.registeredDate}</Typography>
     
      
        <Button onClick={onClose} color="primary">
          Close
        </Button>
        </div>
    </Modal>
  );
};

export default Retrieve;