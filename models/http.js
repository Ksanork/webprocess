/*
 * http.js
 * obsługa zapytań http i ładowanie odpowiednich zasobów
 * 'handleRequest' pobiera rozszerzenie i na jego podstawie podstawia MIME
 * może być roszerzana
 */

var http = require("http");
var path = require("path"); 
var fs = require("fs");

var Http = module.exports = {
    server: null,                   //moduł http
    localpath: null,                //ścieżka do DocumentRoot
    request: null,                  //aktualny adres żądania
    response: null,                 //referencja do odpowiedzi
    validExtensions: {	            //akceptowane rozszerzenia i MIME w żądaniach do zasobów
          ".html" : "text/html",          
          ".js": "application/javascript", 
          ".css": "text/css",
          ".txt": "text/plain",
          ".jpg": "image/jpeg",
          ".gif": "image/gif",
          ".png": "image/png"
    },
    
    init: function(path) {
        this.localpath = path;
        
        var t = this;
        this.server = http.createServer(function(req, res) {
            t.request = req;
            t.response = res;
            
            t.handleRequest(req, res);
        });
    },
    
    handleRequest: function(req, res) {
        var filename = req.url;
        if(filename == '/') filename = "/index.html";
        
        var ext = path.extname(filename);
        var isValidExt = this.validExtensions[ext];
            
        if(isValidExt) {
                var localPath = this.localpath + filename,
                    t = this;
                
                //console.log(localPath);
                    
                //path.exists(localPath, function(exists) {
                fs.exists(localPath, function(exists) {
                    if(exists) {
                             t.getFile(localPath, res, isValidExt);
                    } else {
                                res.writeHead(404);
                                res.end();
                    }
                 });
            
           } else {
                 console.log("Invalid file extension detected: " + ext)
           }
    },
    
    //odczytanie pliku na serwerze i wysłanie nagłówka
    getFile: function(localPath, res, mimeType) {
        fs.readFile(localPath, function(err, contents) {
            if(!err) {
                res.setHeader("Content-Length", contents.length);
                res.setHeader("Content-Type", mimeType);
                res.statusCode = 200;
                res.end(contents);
            } else {
                res.writeHead(500);
                res.end();
            }
        });
   },
   
   //uruchomienie nasłuchiwania na podanym IP i porcie
   listen: function(port, ipaddress) {
       this.server.listen(port, ipaddress);
   }
};
