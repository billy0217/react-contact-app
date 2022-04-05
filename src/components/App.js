import React, { useState , useEffect } from "react";
import { BrowserRouter as Router, Switch, Routes, Route} from "react-router-dom";
import api from '../api/contact';
import { v4 as uuidv4 } from 'uuid';
import Header from "./Header";
import AddContact from "./AddContact";
import EditContact from "./EditContact";
import ContactList from "./ContactList";
import ContactDetail from "./ContactDetail";

function App() {

  const [contacts, setContacts] = useState([]);
  const LOCAL_STORAGE_KEY = "contacts";

  // RetrieveContacts
  const retriveContacts = async () => {
    const response = await api.get("/contacts");
    return response.data;
  }

  const addContactHandler = async (contact) => {

    const request = {
      id: uuidv4(),
      ...contact
    }

    const response = await api.post("/contacts", request);

    setContacts([...contacts, response.data]);
  }

  const updateContactHandler = async (contact) => {
    const response = await api.put(`/contacts/${contact.id}`, contact);
    console.log(response.data);

    const {id, name, email} = response.data;

    setContacts(contacts.map(contact =>{
      return contact.is === id ? {...response.data} : contact;
    }));
  };

  const removeContactHandler = async (id) => {
    await api.delete(`/contacts/${id}`);

    const newContactList = contacts.filter((contact)=>{
        return contact.id !== id;
    });
    
    setContacts(newContactList);
  }

  useEffect(
    () => {

      // const retriveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
      // if(retriveContacts){
      //   setContacts(retriveContacts);
      // } 

      const getAllContacts = async () => {
        const allContants = await retriveContacts();
        if(allContants){
          setContacts(allContants);
        }
      }
      getAllContacts();
    },
    []
  );

  useEffect(
    () => {
      //localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
    },
    [contacts]
  );

  return (
    <div className="ui container">
      <Router>
        <Header />
        <Routes>
            <Route 
              path="/"
              element={<ContactList contacts={contacts} getContactId={removeContactHandler}/>} 
            />
            <Route 
              path="/add" element={<AddContact addContactHandler={addContactHandler}/>} 
            />
            <Route 
              path="/edit" element={<EditContact  updateContactHandler={updateContactHandler}/>} 
            />
            <Route
              path="/contact/:id"
              element={<ContactDetail />}
            />
        </Routes>
      </Router>
    </div>
  );
} 

export default App;
