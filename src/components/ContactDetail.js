import React from "react";
import { Link, useLocation } from "react-router-dom";
import user from '../img/logo.svg'

const ContactDetail = (props) => {
	const { state } = useLocation();

	return(
		<div className="main">
			<div className="ui card centered">
				<div className="image">
					<img className="ui avatar image" src={user} alt="user" />
				</div>
				<div className="content">
					<div className="header">{state.contact.name}</div>
					<div className="">{state.contact.email}</div>
				</div>
				
			</div>
			<div className="center-dev">
				<Link to="/">
					<button className="ui button nlue center">Back to contact list</button>
				</Link>
			</div>
		</div>
		
	)
}

export default ContactDetail; 