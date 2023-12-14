import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './styles.css'; 
import FormDatas from './FormDatas';
import TableDatas from './TableDatas';


const Main = () => {
  const [contacts, setContacts] = useState([]);
  const handleAddContact = (newContact) => {
    setContacts(newContact);
  };

  return (
   

    <React.StrictMode>
      
        <FormDatas onAddContact={handleAddContact} />
        <div className="table-container">
          <TableDatas contacts={contacts} />
        </div>
     
    </React.StrictMode>

   

  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<Main />);