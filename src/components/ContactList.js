import React from "react";
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
		<div className="ui celled list">
			{renderContactList}
		</div>
	)
}

export default ContactList;