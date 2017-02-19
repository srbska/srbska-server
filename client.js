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
    var video = obj.screen + '_' + obj.scene + '.mp4';
    omx.stop();
    omx.open(video, obj.options);
    omx.setPosition(obj.time);
});

socket.on('close', function() {
    omx.quit();
});
