
var http = require("http");

var server = http.createServer(function(request,response){
  response.writeHeader(200, {"Content-Type": "text/plain"});
  response.write("Hello");
  
  response.end();
}).listen(8000);