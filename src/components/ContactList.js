import React from "react";
import { Link } from 'react-router-dom';
import ContactCard from "./ContactCard";

const ContactList = (props) => {
	console.log(props)

	const deletContactHandler = (id) => {
		props.getContactId(id);
	};

	const renderContactList = props.contacts.map((contact) => {
		return(
			<ContactCard 
				key={contact.id}
				contact={contact}
				clickHandler={deletContactHandler}
			/>
		)
	});

	return (
		<div className="main">
			<h2>Contact List</h2>
			<Link to="/add">
				<button className="ui button blue right">Add Contact</button>
			</Link>
			<div className="ui celled list">
				{renderContactList}
			</div>
		</div>
		
	)
}

export default ContactList;