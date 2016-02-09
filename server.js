var ipaddress = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
var port      = process.env.OPENSHIFT_NODEJS_PORT || 8080;
var path = require("path"); 
var fs = require("fs"); 

var WebSocketServer = require('ws').Server
var http = require('http');

var connect = require('connect'),
connect()
   .use(connect.static('<pathyouwishtoserve>'))
   .use(connect.directory('<pathyouwishtoserve>'))
   .listen(8080);