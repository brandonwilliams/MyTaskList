var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var tasks = require('./routes/tasks');

var port = (process.env.PORT || 5000);

var app = express();

//View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

// Set Static Folder
app.use(express.static(path.join(__dirname, 'client')));

// Body Parser MW (Middeware)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "https://mytasklist-71084.herokuapp.com");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
});

app.use('/', index);
app.use('/api', tasks);

app.listen(port, function(){
  console.log('Server started on port '+ port);
});
