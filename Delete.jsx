import React, { useState } from 'react';
import { Modal, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import './styles.css';

const Delete= ({ contact, isOpen, onClose, id, onDelete }) => {
  const [isConfirmationOpen, setConfirmationOpen] = useState(false);

  if (!contact) {
    return null;
  }

  const handleDelete = () => {
    setConfirmationOpen(true);
  };

  const handleConfirmDelete = () => {
    onDelete();
    onClose();
    setConfirmationOpen(false);
  };

  return (
    <>
      <Modal open={isOpen} onClose={onClose}>
        <div className='modal-container'>
          <Typography variant='h6'> Confirm Deletion </Typography>
          <Typography>Are you sure you want to delete the record?</Typography>

          <Button onClick={handleConfirmDelete} color="primary">
            Yes
          </Button>
          <Button onClick={onClose} color="primary">
            No
          </Button>
        </div>
      </Modal>

      <Dialog open={isConfirmationOpen} onClose={() => setConfirmationOpen(false)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete the record?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            No
          </Button>
          <Button onClick={handleConfirmDelete} color="primary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Delete;