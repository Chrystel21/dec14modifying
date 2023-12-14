import React, { useState } from 'react';
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';


const  FormDatas= ({ onAddContact, lastContactId }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    emailAddress: '',
    contactNumber: '',
    location: '',
    registeredDate: '',
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear error message when the user types
    setErrors({
      ...errors,
      [name]: '',
    });
  };

  const formatFullName = () => {
    const { fullName } = formData;
    const names = fullName.split(' ');
    if (names.length === 1) {
      return names[0];
    } else if (names.length === 2) {
      return `${names[1]}, ${names[0]}`;
    } else {
      return `${names[names.length - 1]}, ${names[0]} ${names
        .slice(1, -1)
        .map((middle) => middle.charAt(0))
        .join(' ')}.`;
    }
  };
  const handleAddContact = () => {
    const isValid = validateForm();
  
    if (isValid) {
      const contactIdCounter = parseInt(localStorage.getItem('contactIdCounter')) || 0;
      const newContact = {
        id: contactIdCounter + 1,
        ...formData,
        fullName: formatFullName(),
      };
  
      // Save updated contactIdCounter to local storage
      localStorage.setItem('contactIdCounter', newContact.id);
  
      // Save new contact to local storage
      const storedContacts = JSON.parse(localStorage.getItem('contacts')) || [];
      const updatedContacts = [...storedContacts, newContact];
      localStorage.setItem('contacts', JSON.stringify(updatedContacts));

      console
  
      onAddContact(updatedContacts);
      setFormData({
        fullName: '',
        emailAddress: '',
        contactNumber: '',
        location: '',
        registeredDate: '',

        
      });
      window.location.reload();
     
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Validation for Full Name
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full Name field cannot be blank';
    } else if (!/^[a-zA-Z\s']+$/.test(formData.fullName)) {
      newErrors.fullName = 'Full Name field accepts characters values only';
    } else if (formData.fullName.length > 30) {
      newErrors.fullName = 'Full Name field accepts up to 30 characters only';
    }

    // Validation for Email Address
    if (!formData.emailAddress.trim()) {
      newErrors.emailAddress = 'Email Address field cannot be blank';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.emailAddress)) {
      newErrors.emailAddress = 'Invalid Email Address format';
    } else if (formData.emailAddress.length > 45) {
      newErrors.emailAddress =
        'Email Address field accepts up to 45 characters only';
    }

    // Validation for Contact Number
    if (!formData.contactNumber.trim()) {
      newErrors.contactNumber = 'Contact Number field cannot be blank';
    } else if (!/^\d+$/.test(formData.contactNumber)) {
      newErrors.contactNumber = 'Contact Number field accepts numeric values only';
    } else if (formData.contactNumber.length !== 11) {
      newErrors.contactNumber =
        'Contact Number field accepts up to 11 digits only';
    }

    // Validation for Location
    if (!formData.location.trim()) {
      newErrors.location = 'Location field cannot be blank';
    }

    // Validation for Registered Date
    if (!formData.registeredDate.trim()) {
      newErrors.registeredDate = 'Registered Date field cannot be blank';
    }

    const currentDate = new Date();
    const selectedDate = new Date(formData.registeredDate);

    if (
      selectedDate.toString() === 'Invalid Date' ||
      selectedDate.toDateString() !== currentDate.toDateString()
    ) {
      newErrors.registeredDate = 'Registered Date must be the current date';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <div style={{ textAlign: 'center', fontWeight: 'bold', marginTop: '20px' }}>
      <span>&nbsp;&nbsp;&nbsp;</span>
        <h2></h2>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ marginBottom: '20px', width: '70%', display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ textAlign: 'right', width: '30%', marginRight: '10px' }}>
            <label htmlFor="fullName">Full Name</label>
          </div>
          <div style={{ width: '65%' }}>
            <TextField
              id="fullName"
              value={formData.fullName}
              onChange={(e) => handleInputChange('fullName', e.target.value)}
              error={Boolean(errors.fullName)}
              helperText={errors.fullName}
              fullWidth
            />
          </div>
        </div>
  
        <div style={{ marginBottom: '20px', width: '70%', display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ textAlign: 'right', width: '30%', marginRight: '10px' }}>
            <label htmlFor="emailAddress">Email Address</label>
          </div>
          <div style={{ width: '65%' }}>
            <TextField
              id="emailAddress"
              value={formData.emailAddress}
              onChange={(e) => handleInputChange('emailAddress', e.target.value)}
              error={Boolean(errors.emailAddress)}
              helperText={errors.emailAddress}
              fullWidth
            />
          </div>
        </div>
  
        <div style={{ marginBottom: '20px', width: '70%', display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ textAlign: 'right', width: '30%', marginRight: '10px' }}>
            <label htmlFor="contactNumber">Contact Number</label>
          </div>
          <div style={{ width: '65%' }}>
            <TextField
              id="contactNumber"
              value={formData.contactNumber}
              onChange={(e) => handleInputChange('contactNumber', e.target.value)}
              error={Boolean(errors.contactNumber)}
              helperText={errors.contactNumber}
              fullWidth
            />
          </div>
        </div>
  
        <div style={{ marginBottom: '20px', width: '70%', display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ textAlign: 'right', width: '30%', marginRight: '10px' }}>
            <label htmlFor="location">Select Location</label>
          </div>
          <div style={{ width: '65%' }}>
            <FormControl fullWidth>
              <Select
                id="location"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                error={Boolean(errors.location)}
                displayEmpty
              >
                <MenuItem value="" disabled>Select Location</MenuItem>
                <MenuItem value="Manila">Manila</MenuItem>
                <MenuItem value="Cebu">Cebu</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
  
        <div style={{ marginBottom: '20px', width: '70%', display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ textAlign: 'right', width: '30%', marginRight: '10px' }}>
            <label htmlFor="registeredDate">Registered Date</label>
          </div>
          <div style={{ width: '65%' }}>
            <TextField
              id="registeredDate"
              type="date"
              value={formData.registeredDate}
              onChange={(e) => handleInputChange('registeredDate', e.target.value)}
              error={Boolean(errors.registeredDate)}
              helperText={errors.registeredDate}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
          </div>
        </div>
      </div>
  
      <div style={{ marginBottom: '40px' }}></div>
  
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Button variant="contained" color="primary" onClick={handleAddContact}>
          Add Contact
        </Button>
      </div>
    </div>
  );  
  };

export default FormDatas;