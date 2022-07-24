import React, {Component} from 'react';
import ChannelForm from './ChannelForm.jsx';
import ChannelList from './ChannelList.jsx';
import PropTypes from 'prop-types';

class ChannelSection extends Component{
	render(){
		return(
			<div className='support panel panel-primary half-screen-height'>
				<div className='panel-heading'>
					<strong>Channels</strong>
				</div>
				<div className='panel-body channels panel1-body'>
					<ChannelList {...this.props} />
				</div>
				<div className='panel-footer panel1 panel1-footer'>
					<ChannelForm {...this.props} />
				</div>
			</div>
		)
	}

}

ChannelSection.propTypes = {
	channels: PropTypes.array.isRequired,
	setChannel: PropTypes.func.isRequired,
	addChannel: PropTypes.func.isRequired,
	deleteChannel: PropTypes.func.isRequired
}

export default ChannelSection