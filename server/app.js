var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http = require('http');
var io = require('socket.io')(http, {'pingInterval': 3000, 'pingTimeout': 2000});

var index = require('./routes/index');
var users = require('./routes/users');
const util = require('util')

var app = express();

// Socket IO
// var io = socket_io();
app.io = io;

// counter to hold how much users are currently in the room
let usersCounter = 0;
io.on('connection', (socket) => {
  usersCounter++;
  const user = socket.user
  // emits to all whenever a new user joins to the room
  io.emit('user joined',usersCounter);
  console.log('a user has connected');
  socket.on('new_message',({message}) =>{
    console.log(util.inspect(message,false,null));
    io.emit('new_message',message);
  });
  socket.on('disconnect', () => {
    usersCounter--;
    io.emit('user left',usersCounter)
    console.log('a user has disconnected');
  });
});




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
