import React,{Component} from 'react';
import PropTypes from 'prop-types';
import UserList from './UserList.jsx';

class UserSection extends Component{
	render(){
		return(
			<div className='support panel panel-primary bottom-panel-height'>
				<div className='panel-heading'>
					<strong>Users</strong>
				</div>
				<div className='panel-body users panel1-body'>
					<UserList {...this.props} />
				</div>
			</div>
		)
	}
}

UserSection.propTypes = {
	users: PropTypes.array.isRequired,
	setUser: PropTypes.func.isRequired
}

export default UserSection
