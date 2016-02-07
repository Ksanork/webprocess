var server = require('http').createServer()
  , url = require('url')
  , WebSocketServer = require('ws').Server
  , wss = new WebSocketServer({ server: server })
  , express = require('express')
  , app = express()
  , port = 8080;
 
app.use(function (req, res) {
  res.send({ msg: "hello" });
});
 
wss.on('connection', function connection(ws) {
    console.log("new client");
  var location = url.parse(ws.upgradeReq.url, true);
  // you might use location.query.access_token to authenticate or share sessions 
  // or ws.upgradeReq.headers.cookie (see http://stackoverflow.com/a/16395220/151312) 
  
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
  });
 
  ws.send('something');
});
 
server.on('request', app);
server.listen(port, '127.0.0.1', function () { console.log('Listening on ' + server.address().address + ":" + server.address().port) });