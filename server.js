var express = require("express");
var app = express();

app.use(express.static(__dirname + '/'));

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
var port      = process.env.OPENSHIFT_NODEJS_PORT || 8000;

//app.listen(80, ipaddress);

var WebSocketServer = require('ws').Server


wss = new WebSocketServer({
    port: port,
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

app.listen(80, ipaddress);
