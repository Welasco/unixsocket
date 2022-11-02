var net = require('net');

var clientunixSocket = process.env.clientUnixSocket || '/tmp/socket/server.sock';
var client;
var messageCount = 0
var clientSocket = function(){
    var self = this;
    this.init = function () {
        client = new net.Socket();
        client.connect(clientunixSocket, function() {
            console.log('Client socket_client Connected to socket_server');
        });
        client.on('data', function (data) {
            console.log('Client Received data : ' + data);
        });
        // When connection disconnected.
        client.on('end',function () {
            console.log('Client socket disconnect. ');
            client.destroy();
            setTimeout(function() { self.init() }, 4000);
        });
        client.on('error', function (err) {
            console.log('Error Name: '+err.name+' Message: '+err.message);
            client.destroy();
            setTimeout(function() { self.init() }, 4000);
        });
    }
}
var obj_clientSocket = new clientSocket();
obj_clientSocket.init();

var interval = setInterval(function () {
    client.write('Client Message Sent: '+messageCount);
    messageCount++;
}, 2000);

console.log('Client started using unixSocket: ' + clientunixSocket);