import React from "react";
import { Link } from "react-router-dom";
import user from '../img/logo.svg'

const ContactCard = (props) => {

	const {id, name, email} = props.contact;

	return(
		<div className="item">
			<img className="ui avatar image" src={user} alt="user" />
			<div className="content">
				<Link 
					to={{ 
						pathname: `/contact/${id}`,
					}}
					state={{contact: props.contact}}
				>
					<div className="header">{name}</div>
					<div className="">{email}</div>
				</Link>
			</div>
			<i
				className="trash alternate outline icon"
				style={
					{
						color: 'red',
						marginTop: "5px",
						float: "right",
						display: "inline-block",
						marginLeft: "10px",
					}
				}
				onClick={()=> props.clickHandler(id)}
			></i>
			<Link 
				to="/edit"
				state={{contact: props.contact}}
			>
				<i
					className="edit alternate outline icon"
					style={
						{
							color: 'green',
							marginTop: "5px",
							marginLeft: "10px",
							float: "right",
							display: "inline-block"
						}
					}
				></i>
			</Link>
		</div>
	)
}

export default ContactCard; 