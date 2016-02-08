var WebSocketServer = require('ws').Server
var wss = new WebSocketServer({port: 8081});
var http = require("http");
var sys = require("sys");

var server = http.createServer(function(request,response){
  response.writeHeader(200, {"Content-Type": "text/plain"});
  response.write("Hello");
  if (request.url == "/"){
    for (var i = 0; i < wss.client.length; i++) {
      var ws = wss.clients[i];
      sys.puts("sent msg");
      ws.send("photo plox");
    }
  }
  response.end();
}).listen(8000);