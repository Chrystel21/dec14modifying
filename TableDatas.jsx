import React, { useState, useEffect } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, TablePagination } from '@mui/material';
import Retrieve from './Retrieve';
import Delete from './Delete';
import Update from './Update';

const TableDatas = ({ onUpdatedContact }) => {
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [isViewDialogOpen, setViewDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [updateFormData, setUpdateFormData] = useState({
    fullName: '',
    emailAddress: '',
    contactNumber: '',
    location: '',
    registeredDate: '',
  });

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    const storedContacts = JSON.parse(localStorage.getItem('contacts')) || [];
    setContacts(storedContacts);
  }, []);

  const handleAction = (action, contact) => {
    setSelectedContact(contact);

    // Handle different actions (View, Update, Delete)
    if (action === 'view') {
      setViewDialogOpen(true);
    } else if (action === 'update') {
      setUpdateFormData(contact);
      setOpenUpdateDialog(true);
    } else if (action === 'delete') {
      setDeleteDialogOpen(true);
    }
  };

  const handleUpdate = (updatedContact) => {
    const updatedContacts = contacts.map((c) => (c.id === updatedContact.id ? updatedContact : c));
    setContacts(updatedContacts);
    localStorage.setItem('contacts', JSON.stringify(updatedContacts));
  };

  const handleDeleteConfirm = () => {
    const updatedContacts = contacts.filter((contact) => contact.id !== selectedContact.id);
    setContacts(updatedContacts);
    localStorage.setItem('contacts', JSON.stringify(updatedContacts));
    setSelectedContact(null);
    setDeleteDialogOpen(false);
  };

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style = {{width: '5%', fontWeight: 'bold'}}>Id</TableCell>
              <TableCell style = {{width: '20%', fontWeight: 'bold'}}>Full Name</TableCell>
              <TableCell style = {{width: '20%', fontWeight: 'bold'}}>Email Address</TableCell>
              <TableCell style = {{width: '15%', fontWeight: 'bold'}}>Contact Number</TableCell>
              <TableCell style = {{width: '15%', fontWeight: 'bold'}}>Location</TableCell>
              <TableCell style = {{width: '15%', fontWeight: 'bold'}}>Registered Date</TableCell>
              <TableCell style = {{width: '5%', fontWeight: 'bold'}}></TableCell>
            </TableRow>
          </TableHead>
      <TableBody>
        {(rowsPerPage > 0 ? contacts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : contacts).map((contact, index) => (
          <TableRow key={contact.id}>
            <TableCell>{contact.id}</TableCell>
            <TableCell>{contact.fullName}</TableCell>
            <TableCell>{contact.emailAddress}</TableCell>
            <TableCell>{contact.contactNumber}</TableCell>
            <TableCell>{contact.location}</TableCell>
            <TableCell>{contact.registeredDate}</TableCell>
            <TableCell>
              <div style={{ display: 'flex', gap: '30px', border: '1px solid #ccc', borderRadius: '5px', padding: '5px' }}>
                <Button style={{ color: 'gray', fontWeight: 'bold' }} onClick={() => handleAction('view', contact)}>
                  View
                </Button>
                <Button style={{ color: 'green', fontWeight: 'bold' }} onClick={() => handleAction('update', contact)}>
                  Update
                </Button>
                <Button style={{ color: 'red', fontWeight: 'bold' }} onClick={() => handleAction('delete', contact)}>
                  Delete
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      </Table>
      </TableContainer>
      <div style={{display:'flex', justifyContent: 'center', margin: '10px'}}>   
      <div style = {{marginRight: '10px'}}>
        </div>
        <div>
            Showing {Math.min(rowsPerPage * (page + 1), contacts.length)} of {contacts.length}
        </div>
        </div>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
        component="div"
        count={contacts.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Retrieve contact={selectedContact} isOpen={isViewDialogOpen} onClose={() => setViewDialogOpen(false)} id={contacts.indexOf(selectedContact) + 1} />
      <Delete contact={selectedContact} isOpen={isDeleteDialogOpen} onClose={() => setDeleteDialogOpen(false)} onDelete={handleDeleteConfirm} id={contacts.indexOf(selectedContact) + 1} />
      <Update contact={selectedContact} onUpdate={handleUpdate} onClose={() => setOpenUpdateDialog(false)} open={openUpdateDialog} formData={updateFormData} setFormData={setUpdateFormData} />
    </div>
  );
};

export default TableDatas;