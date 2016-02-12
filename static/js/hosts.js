$(document).ready(function() {
    var socket = new WebSocket('ws://127.0.0.1:8000');
    
    var message = {
        'type': 'get-hosts',
        'content': null
    };
    
    socket.onopen = function() {
        this.send(JSON.stringify(message));
        
        socket.onmessage = function(msg) {
            var json = JSON.parse(msg.data);
            
            for(var i = 0; i < json.content.length; i++) {
                var div = "<div class=\"host\">" +
                            "<img src=\"static/img/host.png\" />" +
                            "<span class=\"name\">" + json.content[i].name + "</span>" +
                        "</div>";
                
                $('#hosts').append(div);
            }
            
            //$("#hosts").html(json.content);
        };
    };
    
    
    console.log("hosts.js - ok");
});

