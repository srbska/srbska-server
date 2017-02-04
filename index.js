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
    
    socket.on('chatMessage', function(msg){
        io.emit('chatMessage', msg);
    });

    socket.on('sceneChanged', function(obj){
        io.emit('sceneChanged', obj);
    });
});

http.listen(port, function(){
    console.log('listening on *:' + port);
});
