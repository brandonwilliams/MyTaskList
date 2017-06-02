var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

var index = require('./routes/index');
var tasks = require('./routes/tasks');
const users = require('./routes/users');

var port = (process.env.PORT || 8080);

var app = express();

// Connect to DB
mongoose.connect(config.database);

// On connection
mongoose.connection.on('connected', () => {
  console.log('Connected to database'+ config.database);
});

// On Error
mongoose.connection.on('error', (err) => {
  console.og('Database error: '+err)
});

//View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

// Set Static Folder
app.use(express.static(path.join(__dirname, 'client')));

// Body Parser MW (Middeware)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// CORS MW
app.use(cors());

// Passport MW
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

// Set Static Folder (Front end / Angular)
app.use(express.static(path.join(__dirname, 'client')));

app.use('/api', tasks);
app.use('/users', users);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/'));
});

app.listen(port, () => {
  console.log('Server started on port '+ port);
});
