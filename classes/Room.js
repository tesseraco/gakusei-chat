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

  addMessage(senderId, message) {
    const message = new Message(senderId, message);
    this.messages.push(message);
  }
}
