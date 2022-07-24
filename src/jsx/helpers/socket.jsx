import {EventEmitter} from 'events';

class Socket{
	constructor(ws = new WebSocket(),ee = new EventEmitter()){
		this.ws = ws;
		this.ee = ee;
		ws.onmessage = this.message.bind(this);
		ws.onopen = this.open.bind(this);
		ws.onclose = this.close.bind(this);
	}

	on(name, fn){
		this.ee.on(name, fn);
	}

	off(name, fn){
		this.ee.removeListener(name,fn);
	}

	emit(name, data){
		const message = JSON.stringify({name, data});
		this.ws.send(message);
	}

	message(e){
		try {
			const message = JSON.parse(e.data);
			switch(message.name){
				case "Verify_Connection":
					switch(message.data.Status){
						case 0: // Account not registered
							console.log("Account not registered");
							this.ws.close();
							break;
						case 1: // Account registered but do not show messaging
							console.log("Account registered")
							if(message.data.Paid > 0){
								if(message.data.ShowMessaging){
									console.log("Start chatting")
									this.ee.emit("loadchannels", message.data.Categories)
								}else{
									console.log("Do not show messaging")
								}
							}else{
								console.log("Account not paid")
								this.ws.close();
							}
							break;
					}
					break;
				case "add_channel":
					this.ee.emit("add_channel", message.data)
					break;
				case "delete_channel":
					this.ee.emit("delete_channel", message.data)
					break;
				case "msg_in":
					this.ee.emit("msg_in", message.data)
					break;
				case "channel_selected":
					this.ee.emit("channel_selected", message.data)
					break;
				case "admin_channel_selected":
					this.ee.emit("onloadusers", message.data)
					break;
				case "user_selected":
					this.ee.emit("onloadmessages", message.data)
					break;
				case "identified":
					this.ee.emit("onIdentified", message.data)
					break;
				default:
					this.ee.emit(message.Name, message.Data)
					break;
			}
			
		}
		catch(err){
			this.ee.emit('error', err);
		}
	}

	open(){
		this.ee.emit('connect');
	}

	close(){
		this.ee.emit('disconnect');
	}
}

export default Socket;