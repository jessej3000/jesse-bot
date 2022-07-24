import React,{Component} from 'react';
import PropTypes from 'prop-types';
import Message from './Message.jsx'

class MessageList extends Component{
	/*constructor() {
		super();
		this.state = {height: 0, triggered: false};
	}*/
	componentDidUpdate(){
			this.ulheight = document.getElementById('msgul').clientHeight;
			const ulcontainer = document.getElementById('ulcontainer');
			ulcontainer.scrollTop = ulcontainer.scrollHeight;
	}
	render(){
		let topmargin = this.ulheight - 200;
		let lines = 0;
		let numOfLines = 0;
		let marginTopStyle = {};
		console.log("Messages length: " + this.props.messages.length)
		if((this.props.messages.length < 10) && (this.props.messages.length > 0)){
		//	topmargin = 0;
		//}else{
			this.props.messages.map(message => {
				lines++;

				numOfLines = Math.floor(message.MsgBody.length / 77);
				if((message.MsgBody.length % 77) > 0){
					numOfLines++;
				}
			})

			topmargin = this.ulheight - ((lines + numOfLines) * 85);
			
			if(topmargin<0){
				topmargin = 0;
			}
		
			marginTopStyle = {marginTop: 'calc(95% - ' + topmargin + 'px)'};
		}else{
			marginTopStyle = {marginTop: '0px)'};
		}
		/*let latestMessage = '';
		let numOfLines = 0;

		if(this.props.messages.length>0){
			latestMessage = this.props.messages[this.props.messages.length - 1].body;
			numOfLines = Math.floor(latestMessage.length / 50);
			console.log('1st numOfLines: ' + numOfLines)
			if((latestMessage.length % 50) > 0){
				numOfLines++;
			}
			console.log('numOfLines: ' + numOfLines)
			topmargin = topmargin - (5 * numOfLines);
			console.log('topmargin: ' + topmargin)
		} */
		/*if(this.props.messages.length>1){
			topmargin = 75 - (this.props.messages.length * 4);
			if(topmargin<0){
				topmargin = 0;
			}
		}*/
		return(
			<ul id='msgul' style={marginTopStyle}>{
				this.props.messages.map(message => {
					return(
						<Message 
							key = {message.MsgID}
							message = {message} 
							guestID = {this.props.guestID}/>)
				})
			}</ul>
		)
	}
}

MessageList.propTypes = {
	messages: PropTypes.array.isRequired,
	guestID: PropTypes.string.isRequired
}

export default MessageList