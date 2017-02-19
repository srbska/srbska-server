// node client.js

var config = require('./config');
var omx = require('omx-interface');
var io = require('socket.io-client');
var socket = io.connect(config.serverAddr);

socket.on('connect', function() {
    socket.emit('log', config.screen + ' connected to ' + config.serverAddr);
    socket.emit('room', config.screen);
});

socket.on('log', function(msg) {
	console.log(msg);
});

socket.on('open', function(obj) {
    var video = obj.screen + '.mp4';
    omx.open(video, obj.options);
});

socket.on('close', function() {
    omx.quit();
});

socket.on('seek', function(time) {
    omx.setPosition(time);
});

socket.on('stop', function(time) {
    omx.stop();
});