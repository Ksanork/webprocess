var ipaddress = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
var port      = process.env.OPENSHIFT_NODEJS_PORT || 8000;

var http = require('./models/http');
var wsserver = require('./models/server');

var routing = {
    '/':        '/index.html',
    'hosts':    '/controllers/HostsController.js',
    'console':  '/controllers/ConsoleController.js'
};

http.init(__dirname);           //http do ładowania zasobów webowych
wsserver.init(http.server);     //websocketserver do komunikacji z hostami

//własna obsługa przychodzących treści
wsserver.handleIncoming = function(ws, message) {
  var json = JSON.parse(message);   //zakłada, że dane wysyłane są za pomocą JSON z polami 'type' i 'content'
  
  //!dodać stałe
  switch(json.type) {
      case "connect":
        this.addClient(json.content.name, ws);
        break;
      case "add":
        //dodanie klienta do bazy
        //odpowiedź z _id
        break;
      case "process-result":
        //przetwarzanie odpowiedzi na komendę
        break;
      case "refresh-result":
        //sprawdza czy połączenie aktualne
        break;
      case "get-hosts":             //zwraca listę połączonych klientów
         this.sendJSON(ws, 'get-hosts-result', this.getClientsNames());
        break;
  }
};

wsserver.handleDisconnect = function(ws) {
    this.removeClient(ws);  
};

console.log("Listening to " + ipaddress + ":" + port + "...");
http.listen(port, ipaddress);

