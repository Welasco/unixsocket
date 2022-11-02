var test = process.env.unixSocket || '/tmp/socket/server.sock';
console.log(test);
console.log('Env unixSocket: ' + process.env.unixSocket);
console.log('Env unixSocket stringfy: ' + JSON.stringify(process.env));
console.log('Env unixSocket logname: ' + JSON.stringify(process.env.LOGNAME));