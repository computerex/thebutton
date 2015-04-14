var express = require('express');
var app = express();

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
		now_str: String
	}
  });
  Message = mongoose.model('Message', messageSchema);
});

app.use(express.static(__dirname+'/public_html'));

app.get('/search', function(req, res){
	Message.find({}).exec(function(err, result){
		res.send(result)
	});
});

app.listen(3000);
