
Skip to content
This repository

    Pull requests
    Issues
    Gist

    @Ksanork

2
16

    5

openshift-quickstart/openshift-nodejs-http-and-websocket-example
Code
Issues 0
Pull requests 0
Wiki
Pulse
Graphs
openshift-nodejs-http-and-websocket-example/server.js
9ddca37 on 4 Nov 2013
@corey112358 corey112358 updating
1 contributor
executable file 34 lines (25 sloc) 947 Bytes
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
var port      = process.env.OPENSHIFT_NODEJS_PORT || 8080;

var WebSocketServer = require('ws').Server
var http = require('http');

var server = http.createServer(function(request, response) {
    console.log((new Date()) + ' Received request for ' + request.url);
    response.writeHead(200, {'Content-Type': 'text/plain'});
      response.write("Welcome to Node.js on OpenShift!\n\n");
      response.end("Thanks for visiting us! \n");
});

server.listen( port, ipaddress, function() {
    console.log((new Date()) + ' Server is listening on port 8080');
});

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



    Status API Training Shop Blog About Pricing 

    © 2016 GitHub, Inc. Terms Privacy Security Contact Help 

