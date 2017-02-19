var socket = io();

function open() {

    var opts = {
        screen: $('#screenSelect').val()
    };

    socket.emit('open', opts);
}

function close() {
    socket.emit('close');
}

function seek() {
    socket.emit('seek', $('#time').val());
}

socket.on('log', function(msg){
    $('#messages').append($('<li>').text(msg));
    $('#messages').scrollTop($('#messages').prop('scrollHeight'));
});

$('#open').on('click', function() {
    open();
});

$('#close').on('click', function() {
    close();
});

$('#seek').on('click', function() {
    seek();
});

$('form').submit(function() {
    socket.emit('log', $('#m').val());
    $('#m').val('');
    return false;
});