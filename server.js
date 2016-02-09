var ipaddress = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
var port      = process.env.OPENSHIFT_NODEJS_PORT || 8080;
var path = require("path"); 
var fs = require("fs"); 

var WebSocketServer = require('ws').Server
var http = require('http');

fs.readFile('./index.html', function (err, html) {
    if (err) {
        throw err; 
    }       
    var server = http.createServer(function(request, response) {
        console.log((new Date()) + ' Received request for ' + request.url);
        response.writeHead(200, {'Content-Type': 'text/html'});
          response.write(html);
          response.end("Thanks for visiting us! \n");
    });
    
    server.listen( port, ipaddress, function() {
        console.log((new Date()) + ' Server is listening on port 8080');
    });
    
    var wss = new WebSocketServer({
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
});

