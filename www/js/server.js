var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var noteSchema = new Scheme({
	title: String;
	post: String;
});

module.exports = mongoose.model('Notes', noteSchema)
mongoose.connect('localhost');



app.use(bodyParser());

var port = process.env.PORT || 8080;

var router = express.Router();

router.get('/', function (req, res){
	res.json({message: 'Hey whats up'});
});

app.use('/api', router);

app.listen(port);

console.log('Listening at '+ port);