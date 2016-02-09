var ipaddress = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
var port      = process.env.OPENSHIFT_NODEJS_PORT || 8000;

var WebSocketServer = require('ws').Server
var http = require('http');
var express = require("express");
var app     = express();

var server = http.createServer(function(request, response) {
    
});

server.listen( port, ipaddress, function() {
    console.log((new Date()) + ' Server is listening on port 8080');
});



      
      /*app.get('/', function(request, response){
        console.log((new Date()) + ' Received request for ' + request.url);
        response.sendFile(__dirname + '/index.html');
    });
    
     app.listen(8080);*/

wss = new WebSocketServer({
    server: server,
    autoAcceptConnections: false
});
wss.on('connection', function(ws) {
  console.log("New connection");
  ws.on('message', function(message) {
    ws.send("Received: " + message);
  });
  ws.send('Welcome!');
});

console.log("Listening to " + ipaddress + ":" + port + "...");