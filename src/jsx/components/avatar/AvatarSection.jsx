import React,{Component} from 'react';
import avatar from '../../../images/jesse.png';

class AvatarSection extends Component{
	render(){
		return(
			<div className='support panel panel-primary three-fourth-screen-height'>
				<div className='panel-body channels panel1-body'>
					<img src={avatar} width="100%"/>
				</div>
			</div>
		)
	}
}

export default AvatarSection
