import React, {Component} from 'react';
import Channel from './Channel.jsx';
import PropTypes from 'prop-types';

class ChannelList extends Component{
	render(){
		return(
			<ul className="nav">{
				this.props.channels.map(chan=>{
					return(
						<Channel
							key = {chan.ID}
							channel = {chan} 
							setChannel = {this.props.setChannel} 
							deleteChannel = {this.props.deleteChannel}
						/>
					)
				})
			}</ul>
		)
	}
}

ChannelList.propTypes = {
	channels: PropTypes.array.isRequired,
	setChannel: PropTypes.func.isRequired,
	deleteChannel: PropTypes.func.isRequired
}

export default ChannelList