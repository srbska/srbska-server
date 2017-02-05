var io = require('socket.io-client');
var socket = io.connect('http://169.254.57.165:3000');

socket.on('connect', function() {
	socket.emit('log', 'rpi connected');

});

socket.on('log', function(msg) {
	console.log(msg);
});
