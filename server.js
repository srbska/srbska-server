var port = 3000;
var Server = require('socket.io');
var io = new Server(port, {});

io.on('connection', function(socket){
    
    socket.on('log', function(msg){
        io.emit('log', msg);
        console.log(msg);
    });

    socket.on('sceneChanged', function(obj){
        io.emit('sceneChanged', obj);
        console.log("change to scene ", obj.index);
    });
});

console.log('listening on *:' + port);