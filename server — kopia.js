var ipaddress = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
var port = process.env.OPENSHIFT_NODEJS_PORT || 8000;

//var iconvlite = require('iconv-lite');
var http = require('./models/http');
var wsserver = require('./models/server');
var db = require('./models/dbo');
var fs = require('fs');

var url = 'localhost:27017/webprocess';
if (process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
    url = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" + process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" + process.env.OPENSHIFT_MONGODB_DB_HOST + ':' + process.env.OPENSHIFT_MONGODB_DB_PORT + '/' + process.env.OPENSHIFT_APP_NAME;
}

http.init(__dirname);
//http do ładowania zasobów webowych !!!!!!!!!!!!!!!1test
wsserver.init(http.server);
//websocketserver do komunikacji z hostami
db.init(url);
//inicjuje połączenie z bazą danych

//własna obsługa przychodzących treści
wsserver.handleIncoming = function(ws, message) {
    var json = JSON.parse(message);
    //zakłada, że dane wysyłane są za pomocą JSON z polami 'type' i 'content'
    console.log(json.type);

    //!dodać stałe i case'y jako funkcje
    switch(json.type) {
    case "connect":
        //dodaje hosta do listy aktywnych klientów
        console.log("id - " + json.content._id + ", " + json.content.date);
        this.addClient(json.content._id, json.content.date, ws);
        this.sendTo(ws, "response from localhost");
        break;
    case "add":
        //dodaje hosta do bazy i odsyła _id
        console.log("add host to db...");
        var t = this;
        db.addHost(json.content.name, function(id) {
            if (id) {
                console.log(id);
                t.sendJSON(ws, "add-result", {
                    "_id" : id
                });
            }
        });
        break;
    case "remove":
        db.removeHost(json.content.id);
        break;
    case "process-execute":
        //!dodać sprawdzanie ip!!!

        console.log("odebrano komendę");
        this.browser = ws;

        var clientws = this.getClientSocketById(json.content.id);
        console.log(clientws);
        if (clientws != null)
            this.sendJSON(clientws, "process-execute", json.content.command);
        break;
    case "process-execute-result":
        console.log("odebrano output");
        console.log(json.content);
        if (this.browser != null)
            this.sendJSON(this.browser, "process-execute-result", json.content);
        break;
    case "screenshot-execute":
        //!!!!!!!!!!!!!!!!!!!!!!
        this.browser = ws;
        this.sendJSON(this.browser, "show-throbber", "");

        var clientws = this.getClientSocketById(json.content.id);
        console.log("id - " + json.content.id + " - " + clientws);
        if (clientws != null)
            this.sendJSON(clientws, "screenshot-execute", json.content.command);
        break;
    case "screenshot-execute-result":
        console.log("odebrano screenshot");
        //console.log(json.content);

        var imageBuffer = new Buffer(json.content, 'base64'), t = this;
        fs.writeFile("screen.png", imageBuffer, function(err) {
            if (t.browser != null)
                t.sendJSON(t.browser, "screenshot-show", "");
        });
        

        break;
    case "ping":
        //!!!!!!!!!!!!!!!!!!!!!!
        console.log("ping ping");
        //sprawdza czy połączenie aktualne
        break;
    case "get-hosts":
        //zwraca listę klientów, podzielonych na połączonych i rozłaczonych
        var t = this;
        db.getHosts(function(hosts) {
            var result = new Array();
            var clients = t.getClientsID();

            for (var i = 0; i < hosts.length; i++) {
                hosts[i]['connected'] = false;

                for (var j = 0; j < clients.length; j++) {
                    if (hosts[i]['_id'] == clients[j]['id']) {
                        hosts[i]['connected'] = true;
                        hosts[i]['date'] = clients[j]['date'];
                        
                        console.log("get-hosts: " + clients[j]['date']);
                    }
                }

                //console.log(clients[i]);
                result.push(hosts[i]);
            }

            t.sendJSON(ws, 'get-hosts-result', result);
        });
        break;
    }
};

wsserver.handleDisconnect = function(ws) {
    console.log("disconnect");
    this.removeClient(ws);
};

console.log("Listening to " + ipaddress + ":" + port + "...");
http.listen(port, ipaddress);

/*setInterval(function() {
            if (fs.existsSync("screen.png")) {
                var stats = fs.statSync("screen.png");
                var fileSizeInBytes = stats["size"];
                console.log(fileSizeInBytes);
    }
    
           
        }, 10);*/

