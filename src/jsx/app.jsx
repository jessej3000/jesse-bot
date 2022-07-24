import React,{Component} from 'react';
// import ReactDOM from 'react-dom';
import ChannelSection from './components/channels/ChannelSection.jsx';
import UserSection from './components/users/UserSection.jsx';
import AvatarSection from './components/avatar/AvatarSection.jsx';
import MessageSection from './components/messages/MessageSection.jsx';
import Socket from './helpers/socket.jsx';
import '../css/style.css';
import InfoSection from './components/info/InfoSection.jsx';

class App extends Component{
	constructor(props){
		super(props);
		this.state = {
			channels: [],
			users: [],
			messages: [],
			activeChannel: {},
			activeUser: {},
      		connected: false,
      		guestID: '',
			session: '',
		};
	}

	componentWillMount(){

	}

	componentDidMount(){
		// let ws = new WebSocket('ws://localhost:9090/')
		let ws = new WebSocket('wss://jesse-server.herokuapp.com//')
		let socket = this.socket = new Socket(ws);
		socket.on('connect', this.onConnect.bind(this));
		socket.on('disconnect', this.onDisconnect.bind(this));

		socket.on('loadchannels', this.onLoadChannels.bind(this));
		socket.on('add_channel', this.onAddChannel.bind(this));
		socket.on('delete_channel', this.onDeleteChannel.bind(this))

		socket.on('msg_in', this.onAddMessage.bind(this));
		socket.on('onloadmessages',this.onLoadMessages.bind(this));

		socket.on('channel_selected', this.onChannelSelected.bind(this));

		socket.on('onloadusers',this.onLoadUsers.bind(this));
		socket.on('onIdentified', this.onIdentified.bind(this))

		/*socket.on('user add', this.onAddUser.bind(this));
		socket.on('user edit', this.onEditUser.bind(this));
		socket.on('user remove', this.onRemoveUser.bind(this));

		socket.on('message add', this.onMessageAdd.bind(this));*/
	}

	componentWillUmount(){
		
	}

	onConnect(){
		this.setState({connected: true});
		console.log("Connected to chat server...")
		const uid = this.generateUUID()
		this.setState({guestID: uid})
		const user = {
			ID: uid
		}
		this.setUser(user)
		this.socket.emit('Verify_Connection',{id:parseInt(1),suid:'1234567890',clienttype:parseInt(0)});
		// console.log('Sending Verify_Connection')
		/*this.socket.emit('user subscribe');*/
		
	}

	onDisconnect(){
		console.log('Chatter Admin disconnected...')
		this.setState({connected: false});
	}

	onLoadChannels(channelArray){
		let {channels} = this.state;
		channels = channelArray;
		this.setState({channels});
	}

	onAddChannel(channel){
		let {channels} = this.state;
		channels.push(channel);
		channels.sort(function(a,b){
		  var keyA = a.name;
		  var keyB = b.name;

		  if (keyA < keyB) return -1;
		  if (keyA > keyB) return 1;
		  return 0;
		});
		this.setState({channels});
	}

	addChannel(channel){
		/*let {channels} = this.state;
		var channelExist = false;

		for(var i = 0;i < channels.length; i++){
			var tmp = channels[i];
			if (typeof tmp != 'undefined'){
				if(tmp.name.trim().toLowerCase() == name.trim().toLowerCase()){
					channelExist = true;
					break;
				}
			}
		}

		if(!channelExist){
			channels.push({id: channels.length, name});

			channels.sort(function(a,b){
			  var keyA = a.name;
			  var keyB = b.name;

			  if (keyA < keyB) return -1;
			  if (keyA > keyB) return 1;
			  return 0;
			});

			this.setState({channels});
		}*/

		// TODO : Send to server
		this.socket.emit('add_channel', {name: channel, siteid: parseInt(1)});
	}

	onDeleteChannel(channel){
		let {channels} = this.state;
		console.log("Receinving channel: Id:" + channel.ID + " siteid: " + channel.SiteID + " to delete")
		channels = channels.filter(chan => chan.ID != channel.ID)
		channels.sort(function(a,b){
		  var keyA = a.name;
		  var keyB = b.name;

		  if (keyA < keyB) return -1;
		  if (keyA > keyB) return 1;
		  return 0;
		});
		this.setState({channels});
	}

	deleteChannel(channel){
		console.log("Deleting the deleting..." + channel.Name + " : " + channel.ID)
		this.socket.emit('delete_channel', {id: parseInt(channel.ID), siteid: parseInt(1)});
	}

	onChannelSelected(guest){
		let {activeChannel} = this.state;
		let {users} = this.state;
		

		if (activeChannel.ID == guest.CategoryID) {
			users.push({ID: guest.GuestID, Name: guest.GuestName});
			this.setState({users})
		}
	}

	onLoadUsers(guests){
		let {users} = this.state;

		users = []; //Clears users

		if (guests){
			if (guests.length > 0) {
				console.log(guests[0].ID + "====}" + guests[0].Name)
				users = guests;
			}
		}

		this.setState({users});
	}

	setChannel(activeC){
		let {activeChannel} = this.state;
		activeChannel = activeC;
		//this.setState({activeChannel});
		// TODO: Get Users in Channel
		let {activeUser} = this.state;
		let {messages} = this.state;

		activeUser = {}; // Reset User
		messages = []; // Reset Messages

		this.setState({activeUser});
		this.setState({messages});

		this.setState({activeChannel});
		console.log(activeChannel.Name + " Category Selected. ChnnelID: " + activeChannel.ID)
		///this.socket.emit('message unsubscribe');
		///this.setState({messages: []});
		this.socket.emit('admin_channel_selected',{siteID:  parseInt(1), channelID: activeChannel.ID});

		/*switch(activeChannel.id){
			case 0:
				users =[
						{id:0, name:"Jesse"},
						{id:1, name:"Joyce"},
						{id:2, name:"Jecko"},
						{id:3, name:"Jacky"},
						{id:4, name:"Joy"}
					]
				break;
			case 1:
				users =[
						{id:0, name:"Carla"},
						{id:1, name:"Caren"},
						{id:2, name:"Cenchi"},
						{id:3, name:"Cachang"},
						{id:4, name:"Casimira"},
						{id:5, name:"Carisa"}
					]
				break;
			case 2:
				users =[
						{id:0, name:"Beboy"},
						{id:1, name:"Bambi"},
						{id:2, name:"Butchoy"},
						{id:3, name:"Baki"},
						{id:4, name:"Bambang"},
						{id:5, name:"Bella"},
						{id:6, name:"Boy"},
						{id:7, name:"Bimbi"},
						{id:8, name:"Gary"}
					]
				break;
			case 4:
				users =[
						{id:0, name:"Tekla"},
						{id:1, name:"Taki"},
						{id:2, name:"Tyra"},
						{id:3, name:"Tekila"},
						{id:4, name:"Tukmoi"}
					]
				break;
			case 5:
				users =[
						{id:0, name:"Marisa"},
						{id:1, name:"Mary"},
						{id:2, name:"Mitch"},
						{id:3, name:"Myka"},
						{id:4, name:"Marion"},
						{id:5, name:"Loste"},
						{id:6, name:"Michael"}
					]
				break;
			case 6:
				users =[
						{id:0, name:"Archel"},
						{id:1, name:"Bambang"},
						{id:2, name:"Mitch"},
						{id:3, name:"Gay"},
						{id:4, name:"Marlon"},
						{id:5, name:"Mista"},
						{id:6, name:"Jordan"}
					]
				break;
			default:
				users =[
						{id:0, name:"Bot 1"},
						{id:1, name:"Bot 2"},
						{id:2, name:"Bot 3"},
						{id:3, name:"Bot 4"},
						{id:4, name:"Bot 5"},
						{id:5, name:"Bot 6"},
						{id:6, name:"Bot 7"}
					]
				break;
		}*/
		//this.setState({users})
	}
	setUser(activeU){
		let {activeUser} = this.state;
		let {guestID} = this.state;
		let {messages} = this.state;

		messages = [];

		activeUser = activeU;

		this.setState({activeUser});
		this.setState({messages});
		this.socket.emit('identify',{ID: guestID, Name: activeU.ID});
		// TODO: Get Users Messages
	}

	S4 () {
		return (((1+Math.random())*0x10000)|0).toString(16).substring(1); 
	}
	generateUUID () {
		let guid = (this.S4() + this.S4() + "-" + this.S4() + "-4" + this.S4().substr(0,3) + "-" + this.S4() + "-" + this.S4() + this.S4() + this.S4()).toLowerCase();
		return guid
	}
	onRemoveUser(removeUser){
		let {users} = this.state;
		users = user.filter(user =>{
			return user.id !== removeUser.id;
		});

		this.setState({users});
	}

	onEditUser(editUser){
		let {users} = this.state;

		users = users.map(user => {
			if(editUser.id === user.id){
				return editUser;
			}
			return user;
		});
	}

	onAddUser(user){
		let {users} = this.state;
		users.push(user);
		this.setState({users})
		// TODO: Send to server
	}

	addUser(guest){
		/*let {users} = this.state;
		users.push({id: guest.GuestID, name: guest.GuestName});
		this.setState({users})*/

		// TODO: Send to server
		//this.socket.emit('user edit', {name});
	}

	onAddMessage(message){
		let {messages, activeUser, ulheight, guestID} = this.state;
		console.log(`====> ${JSON.stringify(message)}`)
		if (activeUser){
			if ((activeUser.ID == message.MsgToID) || (guestID == message.MsgToID)){
				ulheight = document.getElementById('msgul').style.height;
				messages.push(message);
				this.setState({messages, ulheight});
			}
		}
	}

	onIdentified(data){
		let {messages, ulheight, session} = this.state
		console.log(`SESSION ====> ${JSON.stringify(data)}`)
		session = data.Session
		ulheight = document.getElementById('msgul').style.height;
		messages.push(data.Msg);
		this.setState({session, messages, ulheight})
		console.log(`SESSION AFTER====> ${session}`)
	}

	onLoadMessages(msgs){
		let {messages} = this.state;
		console.log(msgs);
		if (msgs){
			if (msgs.length > 0){
				messages = msgs;
				this.setState({messages});
			}
		}
	}

	addMessage(message){
		let {activeUser, session} = this.state;
		if(message.trim().length > 0){
			// let {messages, users, ulheight} = this.state;
			let {messages, ulheight, guestID} = this.state;
			const msg = {
				MsgID: this.generateUUID(),
				MsgFromID: guestID,
				MsgToID: "Jesse",
				MsgBody: message,
				MsgTime: "2021-10-24T22:58:39.983005+08:00",
				MsgAuthor: "Me"
		 	}
			console.log(`MY MSG====> ${JSON.stringify(msg)}`)
			// let createdAt = new Date;
			// let author = users.length > 0 ? users[0].name : 'anonymous';
			// let authorId = 0; //Change later 
			ulheight = document.getElementById('msgul').style.height;
			// messages.push({id: messages.length, body, createdAt, author, authorId});
			messages.push(msg)
			// authorId = 1;
			// messages.push({id: messages.length, body, createdAt, author, authorId});
			this.setState({messages, ulheight});

			// TODO: Send to server
			//let {activeChannel} = this.state;
			console.log("Sending message")
			this.socket.emit('msg_in',{msg:message,recipientid:parseInt(activeUser.ID), session});
			//this.socket.emit('message add',{channelId: activeChannel.id, body});
		}
		
	}
	render(){
		return(
			<div className='app container-fluid whole-screen-height'>
				<div className='nav col-md-4 nopadding whole-screen-height'>
					<InfoSection />
					<AvatarSection />
				{/* 
					<ChannelSection
						{...this.state}
						//channels = {this.state.channels}
						addChannel = {this.addChannel.bind(this)}
						deleteChannel = {this.deleteChannel.bind(this)}
						setChannel = {this.setChannel.bind(this)}/>
					<UserSection
						{...this.state}
						//users = {this.state.users}
						setUser = {this.setUser.bind(this)}/>
				 */}
				 </div>
				<div className='col-md-8 nopadding whole-screen-height'>
					<MessageSection
						{...this.state}
						//messages = {this.state.messages}
						addMessage = {this.addMessage.bind(this)}
			 />
				</div>
			</div>
		)
	}
}

export default App
