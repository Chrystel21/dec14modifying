import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  DialogContentText,
} from '@mui/material';

const Update = ({ contact, onUpdate, onClose, open }) => {
  // State for the updated contact and confirmation dialog
  const [updatedContact, setUpdatedContact] = useState({ ...contact }); // Use a copy of the contact
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);

  // Effect to update the contact when props change
  useEffect(() => setUpdatedContact({ ...contact }), [contact]); // Use a copy of the contact

  // Function to handle input changes
  const handleInputChange = (name, value) =>
    setUpdatedContact({ ...updatedContact, [name]: value });

  // Functions to handle confirmation dialog
  const handleOpenConfirmDialog = () => setConfirmDialogOpen(true);
  const handleCloseConfirmDialog = () => setConfirmDialogOpen(false);

  // Function to handle update and close dialogs
  const handleUpdate = () => {
    handleCloseConfirmDialog();
    onUpdate(updatedContact);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Update Contact</DialogTitle>
      <DialogContent>
        {/* Full Name */}
        <TextField label="Full Name" value={updatedContact?.fullName || ''} disabled />

        {/* Email Address */}
        <TextField
          label="Email Address"
          value={updatedContact?.emailAddress || ''}
          onChange={(e) => handleInputChange('emailAddress', e.target.value)}
        />

        {/* Contact Number */}
        <TextField
          label="Contact Number"
          value={updatedContact?.contactNumber || ''}
          onChange={(e) => handleInputChange('contactNumber', e.target.value)}
        />

        {/* Location */}
        <FormControl>
          <InputLabel>Select Location</InputLabel>
          <Select
            value={updatedContact?.location || ''}
            onChange={(e) => handleInputChange('location', e.target.value)}
          >
            <MenuItem value="Manila">Manila</MenuItem>
            <MenuItem value="Cebu">Cebu</MenuItem>
          </Select>
        </FormControl>

        {/* Registered Date */}
        <TextField
          label="Registered Date"
          type="date"
          value={updatedContact?.registeredDate || ''}
          onChange={(e) => handleInputChange('registeredDate', e.target.value)}
          InputLabelProps={{ shrink: true }}
        />
      </DialogContent>

      {/* Confirmation Dialog */}
      <Dialog open={confirmDialogOpen} onClose={handleCloseConfirmDialog}>
        <DialogTitle>Confirm Update</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please confirm the update to the following:
            <br />
            Email Address: {updatedContact?.emailAddress}
            <br />
            Contact Number: {updatedContact?.contactNumber}
            <br />
            Location: {updatedContact?.location}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdate} color="primary">
            Yes
          </Button>
          <Button onClick={handleCloseConfirmDialog} color="primary">
            No
          </Button>
        </DialogActions>
      </Dialog>

      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleOpenConfirmDialog} color="primary">
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Update;