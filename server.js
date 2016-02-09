var WebSocketServer = require('ws').Server;
var express = require('express');
var app = express();
var http = require("http");

var ipaddr  = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
var port      = process.env.OPENSHIFT_NODEJS_PORT || 8000;

//http - browser
var http = require('http');
var fs = require('fs');

var server = http.createServer(function(req, res){
    fs.readFile('index.html',function (err, data){
        res.writeHead(200, {'Content-Type': 'text/html','Content-Length':data.length});
        res.write(data);
        res.end();
    });
});

server.listen(8000);



//app - websocket
var  wss = new WebSocketServer({server:server})
console.log(wss);
wss.on('connection', function(ws) {
    console.log('/connection connected');
    ws.on('message', function(data, flags) {
        if (flags.binary) { return; }
        console.log('>>> ' + data);
        ws.send('WAZZZUP! from fucking nowehere');
    });
    ws.on('close', function() {
      console.log('Connection closed!');
    });
    ws.on('error', function(e) {
      console.log(e);
    });
});

wss.on('connect', function(ws) {
    console.log('/connect connected');
    ws.on('message', function(data, flags) {
        if (flags.binary) { return; }
        console.log('>>> ' + data);
        if (data == 'test') { console.log('test'); ws.send('got test'); }
        if (data == 'hello') { console.log('hello'); ws.send('WAZZZUP!'); }
    });
    ws.on('close', function() {
      console.log('Connection closed!');
    });
    ws.on('error', function(e) {
      console.log(e);
    });
});

console.log('Listening at IP ' + ipaddr +' on port '+port);
server.listen(port,ipaddr);