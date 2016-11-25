var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(80);

app.use(express.static('public'));

io.on('connection', function (socket) {
  console.log('Got a connection!');
  socket.emit('config', { want: 'sendId' });
  socket.on('config', function(data) {
    console.log('Got config:', data);
  })
});
