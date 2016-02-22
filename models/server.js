/**
 * server.js
 * własna implementacja modułu WebSocketServer
 * odebrane wiadomości są przetwarzana przez metodę 'handleIncoming', którą należy przykryć
 */

var WebSocketServer = require('ws').Server;

var Server = module.exports = {
    browser: null,              //WebSocket przeglądarki połaczenej z serwerem
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
             t.handleDisconnect(this, message);
          });
        });
    },
    
    //dodanie klienta do listy - AUTORYZACJA?
    addClient: function(id, ws) {
        console.log("new client");
        console.log("ilosć klientów " + this.clients.length);
        this.clients.push({
            'id': id,
            'ws': ws
          });  
    },
    
    getClientSocketById: function(id) {
      for(var i = 0; i < this.clients.length; i++) {
            if(id == this.clients[i].id) 
                return this.clients[i].ws;
        }
        
        return null;
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
    getClientsID: function() {
        var result = new Array();
        
        for(var i = 0; i < this.clients.length; i++) {
            result.push({
                'id': this.clients[i].id,
            }); 
        }
            
        return result;  
    },
    
    //dodać pattern? sprawdzenie typu 'content' i automatyczne opakowoywanie go
    sendJSON: function(ws, type, content) {
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