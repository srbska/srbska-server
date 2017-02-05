// node client.js north 10

var screen = process.argv[2];
var sceneLength = process.argv[3]; // 120 secs in final installation
var omx = require('omx-interface');
var io = require('socket.io-client');
var socket = io.connect('http://169.254.57.165:3000');
var currentScene = 0;
var currentTime = 0;
var clockInterval;

var options = {
    audioOutput:'hdmi', 
    blackBackground:true, 
    disableKeys:true, 
    disableOnScreenDisplay:true
};

omx.open(screen + '.mp4', options);

socket.on('connect', function() {
	socket.emit('log', 'rpi connected');
});

socket.on('log', function(msg) {
	console.log(msg);
});

socket.on('sceneChanged', function(obj){
    currentScene = obj.index;
    currentTime = obj.time;
    sceneStart = sceneLength * currentScene;
    sceneEnd = sceneStart + sceneLength;
    var seekTo = sceneStart + currentTime;
    console.log("change to scene ", currentScene, ", at time ", seekTo);
    resetClock();
    omx.setPosition(seekTo);
});

function resetClock() {

    clearInterval(clockInterval);

    clockInterval = setInterval(function() {
        if (currentTime === sceneLength - 1) {
            currentTime = 0;
        } else {
            currentTime += 1;
        }

        if (!master) {
            if (omx.getCurrentPosition() >= sceneEnd - 1) {
                video.currentTime = sceneStart;
                //omx.setPosition(sceneStart);
            }
        }

        console.log(currentTime);
    }, 1000);

}