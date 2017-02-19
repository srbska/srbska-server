var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var port = process.argv[2] || 3000;

app.use(express.static('public'));

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
    
    function log(message) {
        socket.emit('log', message);
    }

    socket.on('log', function(msg){
        io.emit('log', msg);
        console.log(msg);
    });

    socket.on('room', function(room) {
        socket.join(room);
    });

    socket.on('open', function(obj) {
        
        var opts = {
            options: {
                audioOutput:'hdmi', 
                blackBackground: true, 
                disableKeys: true, 
                disableOnScreenDisplay: true,
                loop: true
            },
            screen: obj.screen
        };

        io.sockets.in(obj.screen).emit('open', opts);
        log('open screen:' + opts.screen);
    });

    socket.on('close', function() {
        io.emit('close');
        log('close');
    });

    socket.on('seek', function(time) {
        io.emit('seek', time);
        log('seek', time);
    });
});

http.listen(port, function(){
    console.log('listening on *:' + port);
});

