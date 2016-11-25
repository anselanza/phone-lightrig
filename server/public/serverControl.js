var socket = io.connect('http://localhost');
socket.on('connect', function (socket) {
 console.log('connected');
});

function startBlinkAll() {
  socket.emit('remote', { id: 'all', command: 'blinkStart'} );
}

function stopBlinkAll() {
  socket.emit('remote', { id: 'all', command: 'blinkStop'} );
}
