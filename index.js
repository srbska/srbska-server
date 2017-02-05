var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var omx = require('omx-interface');

// node index.js north 10

var port = 3000;
var screen = process.argv[2];
var sceneLength = process.argv[3]; // 120 secs in final installation
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

app.use(express.static('public'));

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
    
    socket.on('log', function(msg){
        io.emit('log', msg);
    });

    socket.on('sceneChanged', function(obj){
        //io.emit('sceneChanged', obj);
        currentScene = obj.index;
		currentTime = obj.time;
        sceneStart = sceneLength * currentScene;
        sceneEnd = sceneStart + sceneLength;
        resetClock();
        omx.setPosition(sceneStart + currentTime);
    });
});

function resetClock() {

    clearInterval(clockInterval);

    clockInterval = setInterval(function() {
        if (currentTime === sceneLength - 1) {
            currentTime = 0;
        } else {
            currentTime += 1;
        }

        if (omx.getCurrentPosition() >= sceneEnd - 1) {
            video.currentTime = sceneStart;
            omx.setPosition(sceneStart);
        }

    }, 1000);

}

http.listen(port, function(){
    console.log('listening on *:' + port);
});
