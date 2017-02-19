// node client.js

var config = require('./config');
var omx = require('omx-interface');
var io = require('socket.io-client');
var socket = io.connect(config.serverAddr);

socket.on('connect', function() {
	socket.emit('log', 'rpi connected to ' + config.serverAddr);
});

socket.on('log', function(msg) {
	console.log(msg);
});

socket.on('play', function(obj) {
    omx.open(obj.video, obj.options);
    omx.setPosition(obj.time);
});
