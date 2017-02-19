// node client.js

var config = require('./config');
var omx = require('omx-interface');
var io = require('socket.io-client');
var socket = io.connect(config.serverAddr);

socket.on('connection', function(s) {
    s.emit('log', config.screen + ' connected to ' + config.serverAddr);
    s.join(config.screen);
});

socket.on('log', function(msg) {
	console.log(msg);
});

socket.on('open', function(obj) {
    var video = obj.screen + '_' + obj.scene + '.mp4';
    omx.open(video, obj.options);
    omx.setPosition(obj.time);
});

socket.on('close', function() {
    omx.quit();
});
