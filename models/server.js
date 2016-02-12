/*
 * server.js
 * własna implementacja modułu WebSocketServer
 * odebrane wiadomości są przetwarzana przez metodę 'handleIncoming', którą należy przykryć
 */

var WebSocketServer = require('ws').Server;

var Server = module.exports = {
    ws: null,                   //moduł WebSocketServer
    clients: new Array(),       //aktaulnie połączeni klienci
    
    init: function(server) {            //server - moduł http
        this.ws = new WebSocketServer({
            server: server,
            autoAcceptConnections: false
        });
        
        var t = this;
        
        //zdarzenie reagujące na połączenie z klientem
        this.ws.on('connection', function(ws) {
          console.log("new connection");
          
          //zdarzenie reagujące na przychodzące wiadomości
          ws.on('message', function(message) {
            t.handleIncoming(this, message);
          });
          
          ws.on('close', function(message) {
            console.log('disconnect');
          });
        });
    },
    
    //dodanie klienta do listy - AUTORYZACJA?
    addClient: function(name) {
        console.log("new client");
        this.clients.push({
            'name': name    
          });  
    },
    
    sendTo: function(ws, message) {
        ws.send(message);
    },
    
    //dodać pattern?
    sendJSON: function(ws, type, content) {
        console.log(this.clients);
        
        var prepjson = {
            'type': type,
            'content': content
        };
        
        this.sendTo(ws, JSON.stringify(prepjson));
    },
   
    //do przykrycia
    handleIncoming: function(ws, message) {}
};