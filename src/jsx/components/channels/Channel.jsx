import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Channel extends Component{
	onClick(e){
		e.preventDefault();
		const {setChannel, channel} = this.props;
		setChannel(channel);
	}
	onClickX(e){
		e.preventDefault();
		const {deleteChannel, channel} = this.props;
		deleteChannel(channel);
	}
	render(){
		const {channel} = this.props;
		return(
			<li className="nav-item">
				<a onClick={this.onClick.bind(this)}>
					{channel.Name}
					<i onClick={this.onClickX.bind(this)}
					>X</i>
				</a>
			</li>
		)
	}
}

Channel.propTypes = {
	channel: PropTypes.object.isRequired,
	setChannel: PropTypes.func.isRequired,
	deleteChannel: PropTypes.func.isRequired
}

export default Channel