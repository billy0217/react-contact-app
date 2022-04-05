import React, { useState , useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import Header from "./Header";
import AddContact from "./AddContact";
import ContactList from "./ContactList";

function App() {

  const [contacts, setContacts] = useState([]);

  // const contacts = [
  //   {
  //     id: 1,
  //     name: "David",
  //     email: "email@email.com"
  //   },
  //   {
  //     id: 2,
  //     name: "John",
  //     email: "email2@email.com"
  //   }
  // ];

  const LOCAL_STORAGE_KEY = "contacts";

  const addContactHandler = (contact) => {
    setContacts([...contacts, { id: uuidv4(), ...contact }]);
  }

  const removeContactHandler = (id) => {
    const newContactList = contacts.filter((contact)=>{
        return contact.id !== id;
    });
    setContacts(newContactList);
  }

  useEffect(
    () => {
      const retriveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
      if(retriveContacts){
        setContacts(retriveContacts);
      } 
    },
    []
  );

  useEffect(
    () => {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
    },
    [contacts]
  );

  return (
    <div className="ui container">
      <Header />
      <AddContact addContactHandler={addContactHandler}/>
      <ContactList contacts={contacts} getContactId={removeContactHandler}/>
    </div>
  );
}

export default App;
