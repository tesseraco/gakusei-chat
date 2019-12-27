const User = require('./User');
const Message = require('./Message');

class Room {
  constructor() {
    this.users = [];
    this.messages = [];
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
