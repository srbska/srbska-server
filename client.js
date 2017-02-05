// node client.js north 10

var screen = process.argv[2];
var sceneLength = process.argv[3]; // 120 secs in final installation
var omx = require('omx-interface');
var io = require('socket.io-client');
var socket = io.connect('http://169.254.57.165:3000');
var currentScene = 0;
var currentTime = 0;
var sceneStart = 0;
var sceneEnd = sceneLength;
var clockInterval;

var options = {
    audioOutput:'hdmi', 
    blackBackground:true, 
    disableKeys:false, 
    disableOnScreenDisplay:false
};

omx.open(screen + '.mp4', options);

resetClock();

socket.on('connect', function() {
	socket.emit('log', 'rpi connected');
});

socket.on('log', function(msg) {
	console.log(msg);
});

socket.on('sceneChanged', function(obj){
    currentScene = parseInt(obj.index);
    currentTime = parseInt(obj.time);
    resetClock();
    sceneStart = sceneLength * currentScene;
    sceneEnd = sceneStart + sceneLength;
    console.log("scene end", sceneEnd);
    var seekTo = sceneStart + currentTime;
    console.log("change to scene", currentScene, "at", seekTo);
    omx.setPosition(seekTo);
});

function resetClock() {

    clearInterval(clockInterval);

    clockInterval = setInterval(function() {
        if (currentTime === sceneLength) {
            currentTime = 0;
        } else {
            currentTime += 1;
        }

        var currentPosition = omx.getCurrentPosition(); 

        console.log("current position", currentPosition);
        //console.log("scene end", sceneEnd);

        if (currentPosition >= sceneEnd) {
            console.log("restart scene");
            omx.setPosition(sceneStart);
        }

        //console.log(currentTime);
    }, 1000);

}
