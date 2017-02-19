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

console.log('listening on *:' + port);