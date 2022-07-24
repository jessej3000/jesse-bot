import React,{Component} from 'react';
import PropTypes from 'prop-types';

class User extends Component{
	onClick(e){
		e.preventDefault();
		const {setUser, user} = this.props;
		setUser(user);
	}
	render(){
		const {user} = this.props;
		return(
			<li className="nav-item">
				<a onClick={this.onClick.bind(this)}>
					{user.Name}
				</a>
			</li>
		)
	}
}

User.propTypes = {
	user: PropTypes.object.isRequired,
	setUser: PropTypes.func.isRequired
}

export default User