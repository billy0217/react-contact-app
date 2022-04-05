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
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchReult] = useState([]);

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

  const searchHandler = (searchTerm) => {
    setSearchTerm(searchTerm);

    if(searchTerm !== ''){
      const newContactList = contacts.filter( (contact) => {
        return Object.values(contact)
              .join(" ")
              .toLowerCase()
              .includes(searchTerm.toLowerCase());
      })
      setSearchReult(newContactList);
    }else{
      setSearchReult(contacts);
    }
    
  };

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
    <div className="ui container" style={{ padding: "100px 0" }}>
      <Router>
        <Header />
        <Routes>
            <Route 
              path="/"
              element={
                <ContactList
                  contacts={searchTerm.length < 1 ? contacts: searchResult}
                  getContactId={removeContactHandler}
                  term={searchTerm}
                  searchKeyword={searchHandler}
                />
              } 
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
