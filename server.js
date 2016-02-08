var express = require('express')
var server = new express()
server.use(express.static(__dirname+"/public"))


server.get('/', function (request, response) {
    response.send(200)
})

server.listen(process.env.OPENSHIFT_NODEJS_PORT || 80)