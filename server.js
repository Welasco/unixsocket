const net = require('net');
const unixSocketServer = net.createServer();

var unixSocket = process.env.unixSocket || '/tmp/socket/server.sock';

// Set of all currently connected sockets
const connectedSockets = new Set();

// broadcast to all connected sockets except one
connectedSockets.broadcast = function(strData, except) {
    for (let sock of this) {
        sock.write('Server Response: '+strData);
        if (strData.includes("close")) {
            console.log("The socket server will be terminated.");
            sock.write('The socket server will be terminated.');
            server.close();
        }
    }
}

var server = net.createServer(function(sock){
    connectedSockets.add(sock);
    console.log('Socket Server: CONNECTED: ' + sock.remoteAddress +':'+ sock.remotePort);
    sock.setEncoding('utf-8');

    sock.on('data', function(data) {
        var strData = data.toString();
        console.log("Socket Server received: "+strData);
        connectedSockets.broadcast(strData, sock);
    });

    sock.on('close', function(data) {
        connectedSockets.delete(sock);
        console.log('Socket Server: CLOSED: ' + sock.remoteAddress +' '+ sock.remotePort);
    });

    sock.on('error', function (error) {
        console.log('Socket Server: ERROR: ' + error);
    });

    var interval = setInterval(function () {
        var date = new Date().toString();
        var msg = "Message loop from socket server "+date+"\n\r";
        console.log("Printing before send: " + msg);
        sock.write(msg);
    }, 10000);

}).listen(unixSocket);

process.on('SIGTERM', function() {
    console.log('Docker Stop detected!');
    console.log('Process shutting down...');
    server.close();
});

process.on('SIGINT', function(){
    console.log("Caught interrupt signal");
    server.close();
    console.log('process shutting down...');
    process.exit();
});

console.log('Socket Server started at: ' + unixSocket);