import React,{Component} from 'react';
import PropTypes from 'prop-types';

class MessageForm extends Component{
	onSubmit(e){
		e.preventDefault();
		const node = this.refs.message;
		const message = node.value;
		this.props.addMessage(message);
		node.value = '';
	}
	render(){
		let input;
		if(this.props.activeUser.ID !== undefined){
			input = (
				<input
					ref = 'message' 
					type = 'text'
					className = 'form-control' 
					placehodler = 'Type in your message...' />
			)
		}
		return(
			<form onSubmit = {this.onSubmit.bind(this)}>
				<div className='form-group'>
					{input}
				</div>
			</form>
		)
	}
}

MessageForm.propTypes = {
	activeUser: PropTypes.object.isRequired,
	addMessage: PropTypes.func.isRequired
}

export default MessageForm