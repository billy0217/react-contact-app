import * as React from "react";
import { useLocation } from 'react-router-dom';

export function withRouter(Children){
	return(props)=>{

        const data  = {state: useLocation()};
        return <Children {...props}  data = {data}/>
    }
}

class EditContact extends React.Component {
	
	constructor(props){
		super(props)

		const {id, name, email} = props.data.state.state.contact;

		this.state = {
			id,
			name,
			email
		}
	}

	update = (e) => { 
		
		e.preventDefault();
		//history("/" , { replace: true });
		
		if(this.state.name === "" || this.state.email === ""){
			alert("All field are madatory");
			return
		}

		this.props.updateContactHandler(this.state)
		this.setState({ name: "", email: "" });
		window.location.href = '/';
	}

	render() {
		return (
			<div className="ui main">
				<h2>Edit Contact</h2>
				<form 
					className="ui form"
					onSubmit={this.update}
				>
					<div className="field">
						<label>Name</label>
						<input 
							type="text"
							name="name"
							placeholder="name"
							value={this.state.name}
							onChange={
								(e)=> this.setState({name: e.target.value})
							}
						/>
					</div>
					<div className="field">
						<label>Email</label>
						<input 
							type="email"
							name="email"
							placeholder="email"
							value={this.state.email}
							onChange={
								(e)=> this.setState({email: e.target.value})
							}
						/>
					</div>
					<div>
						<button className="ui button blue">Update</button>
					</div>
				</form>
			</div>
		);
	}
}

export default withRouter(EditContact);