var express = require('express');
var app = express();

app.get('/', function(req, res) {
    res.send("Hello");
});

var ipaddr  = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
var port    = process.env.OPENSHIFT_NODEJS_PORT || 8000;

app.listen(80);
