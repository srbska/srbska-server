var port = process.argv[2] || 3000;
var express = require('express');
var app = express();
var http = require('http').Server(app);
var Server = require('socket.io');
var io = new Server(port, {});

io.on('connection', function(socket){
    
    socket.on('log', function(msg){
        io.emit('log', msg);
        console.log(msg);
    });

    socket.on('sceneChanged', function(obj) {
        io.emit('sceneChanged', obj);
        console.log('change to scene', obj.index);
    });

    socket.on('play', function(obj) {
        io.emit('play', {
            options: {
                audioOutput:'hdmi', 
                blackBackground: true, 
                disableKeys: false, 
                disableOnScreenDisplay: false
            },
            video: obj.video,
            time: obj.time
        });
        console.log('play', video);
    });
});

console.log('server listening on *:' + port);

app.use(express.static('public'));

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

http.listen(port, function(){
    console.log('listening on *:' + port);
});
