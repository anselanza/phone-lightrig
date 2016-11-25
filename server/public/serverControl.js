var socket = io.connect('http://localhost:9000');
socket.on('connect', function (socket) {
 console.log('connected');
});

function startBlinkAll() {
  console.log('sending remote command blinkStart')
  socket.emit('remote', { id: 'all', command: 'blinkStart'} );
}

function stopBlinkAll() {
  console.log('sending remote command blinkStop');
  socket.emit('remote', { id: 'all', command: 'blinkStop'} );
}
