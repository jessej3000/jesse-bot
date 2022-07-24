import React,{Component} from 'react';
import PropTypes from 'prop-types';
import User from './User.jsx';

class UserList extends Component{
	render(){
		return(
			<ul className="nav">{
				this.props.users.map(user=>{
					return(
						<User 
							key={user.ID}
							user={user}
							setUser={this.props.setUser}
						/>
					)
				})
			}</ul>
		)
	}
}

UserList.propTypes = {
	users: PropTypes.array.isRequired,
	setUser: PropTypes.func.isRequired
}

export default UserList