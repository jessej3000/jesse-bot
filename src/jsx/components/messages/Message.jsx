import React,{Component} from 'react';
import fecha from 'fecha';
import PropTypes from 'prop-types';

class Message extends Component{
  render(){
    let {message} = this.props;
    let {guestID} = this.props;
    //let createdAt = fecha.format(message.createdAt, 'dddd MMMM Do hh:mm:ss.SSS A');
    let bubblePic = '';
    let bubbleArrow = '';
    let bubbleMessage = '';
    let author = '';

    if(message.MsgFromID == guestID){
      bubblePic = 'bubble-pic-agent';
      bubbleArrow = 'bubble-arrow-agent';
      bubbleMessage = 'bubble-message-agent';
      author = 'Me';
    }else{
      bubblePic = 'bubble-pic-client';
      bubbleArrow = 'bubble-arrow-client';
      bubbleMessage = 'bubble-message-client';
      author = message.MsgAuthor;
    }
    return(
      <li className='message'>
        <div className='bubble-container'>
          <div className={bubblePic}></div>
          <div className={bubbleArrow}>
            <span className='ar1'></span>
            <span className='ar2'></span>
          </div>
          <div className={bubbleMessage}>
            <div className='author'>
              <strong>{author}</strong>
            </div>
            <div className='body'>
              <p className='wordwrap'>{message.MsgBody}</p>
            </div>
            <div className='bubble-time'>
              <i className='timestamp'>{message.MsgTime}</i>
            </div>
          </div>
        </div>
      </li>
    )
  }
}

Message.propTypes = {
  message: PropTypes.object.isRequired,
  guestID: PropTypes.string.isRequired
}

export default Message