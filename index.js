var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

var connections = [];

server.listen(process.env.PORT || 3000);

console.log('Server running...')

app.get('/', function(req,res){
  res.sendFile(__dirname + "/index.html");
});

app.get('/connect', function(req,res){
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ message: 'Hello World' }));
});


io.sockets.on('connect', function(socket){
  connections.push(socket);
  console.log('Connected: %s sockets connected', connections.length);

  socket.on('disconnect', function(data){
    connections.splice(connections.indexOf(socket), 1);
    console.log('Disconnected: %s sockets connected', connections.length);
  });

  socket.on('client-msg', function(data){
    console.log('Client Message : %s', data);
    var response = Recieved Message : ${data};
    socket.emit('server-msg', response);
  });
});
