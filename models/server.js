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
          t.handleConnect(ws);
          
          //zdarzenie reagujące na przychodzące wiadomości
          ws.on('message', function(message) {
            t.handleIncoming(this, message);
          });
          
          //zdarzenie reagujące na zamykanie połączenia
          ws.on('close', function(message) {
             t.handleDisconnect(ws, message);
          });
        });
    },
    
    //dodanie klienta do listy - AUTORYZACJA?
    addClient: function(name, ws) {
        console.log("new client");
        console.log("ilosć klientów " + this.clients.length);
        this.clients.push({
            'name': name,
            'ws': ws
          });  
    },
    
    //usuwa klienta na podstawie obiektu socketu
    removeClient: function(ws) {
        for(var i = 0; i < this.clients.length; i++) {
            if(ws == this.clients[i].ws) 
                this.clients.splice(i, 1);
        }
    },
    
    sendTo: function(ws, message) {
        ws.send(message);
    },
    
    //zwraca tylko this.clients bez ws
    getClientsNames: function() {
        var result = new Array();
        
        for(var i = 0; i < this.clients.length; i++) {
            result.push({
                'name': this.clients[i].name,
            }); 
        }
            
        return result;  
    },
    
    //dodać pattern?
    sendJSON: function(ws, type, content) {
        //console.log(this.clients);
        
        var prepjson = {
            'type': type,
            'content': content
        };
        
        this.sendTo(ws, JSON.stringify(prepjson));
    },
   
    //do przykrycia
    handleConnect: function(ws) {},
    handleIncoming: function(ws, message) {},
    handleDisconnect: function(ws, message) {}
};