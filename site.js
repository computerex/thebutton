var express = require('express');
var app = express();

app.use(express.static(__dirname+'/public_html'));

app.get('/search', function(req, res){
	res.write("hi from here too");
	res.end();
});
app.listen(3000);