var express = require("express");
var app = express();

app.use(express.static(__dirname + '/'));

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
var port      = process.env.OPENSHIFT_NODEJS_PORT || 8000;

app.listen(port, ipaddress);
