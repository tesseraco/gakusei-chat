const User = require('./User');
const Message = require('./Message');

class Room {
  constructor(roomId) {
    this.users = [];
    this.messages = [];
    this.roomId = roomId;
  }

  addUser(userId, userName, userIsAdmin) {
    const user = new User(userId, userName, userIsAdmin);
    this.users.push(user);
  } 

  addMessage(senderId, msg) {
    const message = new Message(senderId, msg);
    this.messages.push(message);
  }
}
