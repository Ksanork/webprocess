var http = require("http");
var path = require("path"); 
var fs = require("fs");

function CentralController() {}

CentralController.prototype = {
  initHttp: function(port) {
      
  },
  
  initWebSocket: function(port) {
      
  },
  
  loadController: function(controller) {
     require(controller);  
  },
  
  getDatabaseHandle: function() {
     return;  
  },
  
  display: function() {
    
  }
};
