module.exports = class Message {
  constructor(senderId, message, type) {
    this.senderId = senderId;
    this.message = message;
    this.type = type;
  }
}
