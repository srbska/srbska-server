var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static('public'));

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
    
    socket.on('log', function(msg){
        io.emit('log', msg);
    });

    socket.on('sceneChanged', function(obj){
        io.emit('sceneChanged', obj);
    });
});

http.listen(3000, function(){
    console.log('listening on *:3000');
});
