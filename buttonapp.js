var WebSocket = require('ws')
  , ws = new WebSocket('wss://wss.redditmedia.com/thebutton?h=ca5b0ad3e7703a8f09a31d9ef8c8164c308a5959&e=1429052060');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/thebutton');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

var messageSchema, Message;



db.once('open', function (callback) {
  console.log("successfully connected to db");
  messageSchema = mongoose.Schema({
	type: String, 
	payload: {
		participants_text: String, 
		tick_mac: String, 
		now_str: String,
		seconds_left: String
	}
  });
  Message = mongoose.model('Message', messageSchema);

  Message.find(function (err, messages) {
  	if (err) return console.error(err);
  	console.log(messages)
  });
	

});

var lastMessage = null;

ws.on('message', function(message) {
	message = JSON.parse(message);
	if ( lastMessage != null ) {
		if ( lastMessage.payload.seconds_left < message.payload.seconds_left ) {
			console.log(lastMessage);
			var m = Message(lastMessage);
			m.save(function(err,m) {
				if(err)return console.error(err);
			});
		}
	}
	lastMessage = message;
});

