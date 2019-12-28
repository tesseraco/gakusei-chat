var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

const Room = require('./classes/Room');
const Message = require('./classes/Message');
const User = require('./classes/User');
const generateMessage = require('./functions/generateMessage');
const isValidMessage = require('./functions/isValidMessage');

const rooms = [];

server.listen(process.env.PORT || 3000);


io.on('connection', function(socket){

  socket.on('join', (params, callback) =>{

    try {
      const { userId, roomId } = params;

      //Find whether the room already exists, if not create new
      let room = rooms.find(room => room.roomId === roomId);
      if(!room) {
        room = new Room(roomId);
        rooms.push(room);
      }

      //Find whether the user already is added in the room already, if not add
      let user = room.users.find(user => user.userId === userId);
      if(!user) {
        user = new User('Test User', userId);
        room.users.push(user);
      }

      socket.join(roomId);
      io.to(roomId).emit('updateUsersList', room.users)
      socket.emit('alertMessage',`${userId} has joined the chat`);
      callback();
      } catch(e) {
        callback(e);
      }
  })

  socket.on('createMessage', (params, callback) => {
    try {
      const { userId, roomId, message } = params;

      if(!isValidMessage(message)) return;

      let room = rooms.find(room => room.roomId === roomId);
      if(!room) {
        return callback('Room does not exist')
      }

      let user = room.users.find(user => user.userId === userId);
      if(!user) {
        return callback('Given user does not exist in the room')
      }

      io.to(roomId).emit('newMessage', generateMessage(userId, message));
    } catch(e) {
      callback(e);
    }
  })
  
  socket.on('typing', (params, callback) => {
    try {
      const {userId, roomId, status } = params;

      let room = rooms.find(room => room.roomId === roomId);
      if(!room) {
        return callback('Room does not exist')
      }

      let user = room.users.find(user => user.userId === userId);
      if(!user) {
        return callback('Given user does not exist in the room')
      }

      socket.broadcast.to(roomId).emit('updateTypingStatus', {
        userId,
        status
      })

    }
  })

  socket.on('leave', (params, callback) => {
    try {
      const { userId, roomId } = params;

      let room = rooms.find(room => room.roomId === roomId);
      if(!room) {
        return callback('Room does not exist')
      }

      let user = room.users.find(user => user.userId === userId);
      if(!user) {
        return callback('Given user does not exist in the room')
      }

      room.users = rooms.users.filter(user => user.userId !== userId);
      socket.broadcast.to(roomId),emit('updateUsersList', rooms.users);
      socket.broadcast.to(roomId).emit('alertMessage', `${userId} has left the chat`);
    } catch(e) {
      callback(e);
    }
  });
});
