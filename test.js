var WebSocket = require('ws')
  , ws = new WebSocket('ws://127.0.0.1:3400');
ws.on('open', function() {
    ws.send('something');
});
ws.on('message', function(message) {
    console.log('received: %s', message);
});