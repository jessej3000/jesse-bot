import React,{Component} from 'react';
import PropTypes from 'prop-types';
import MessageList from './MessageList.jsx';
import MessageForm from './MessageForm.jsx';

class MessageSection extends Component{
	render(){
		/*let {activeChannel} = this.props;
		let activeChannelName = '';

		if(typeof activeChannel.name != 'undefined'){
			activeChannelName = activeChannel.name;
		}else{
			activeChannelName = 'Please select a channel.'
		}*/

		let {activeUser} = this.props;
		let activeUserName = '';

		if(typeof activeUser.Name != 'undefined'){
			activeUserName = activeUser.Name;
		}else{
			activeUserName = 'Ready to serve you!'
		}

		return(
			<div className = 'messages-container panel panel-default message-container-height'>
				<div className = 'panel-heading'>
					<strong>{activeUserName}</strong>
				</div>
				<div id='ulcontainer' className='panel-body message panel1-message-body'>
					<MessageList {...this.props} />
				</div>
				<div className='panel-footer panel2 panel2-footer'>
					<MessageForm {...this.props} />
				</div>
			</div>
		)
	}
}

MessageSection.propTypes = {
	messages: PropTypes.array.isRequired,
	addMessage: PropTypes.func.isRequired,
	activeUser: PropTypes.object.isRequired,
	guestID: PropTypes.string.isRequired
}

export default MessageSection