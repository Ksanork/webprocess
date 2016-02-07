var net = require('net');


var server = net.createServer(function(socket) {
    socket.on('data', function (data) {
        console.log(data);
        
      });
    
    socket.pipe(socket);
});

console.log("Listening...");
server.listen(8080);