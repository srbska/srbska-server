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
    
    socket.on('log', function(msg){
        io.emit('log', msg);
        console.log(msg);
    });

    socket.on('open', function(obj) {
        io.emit('open', {
            options: {
                audioOutput:'hdmi', 
                blackBackground: true, 
                disableKeys: false, 
                disableOnScreenDisplay: false
            },
            screen: obj.screen,
            scene: obj.scene,
            time: obj.time
        });
        console.log('open', obj);
    });
});

http.listen(port, function(){
    console.log('listening on *:' + port);
});

