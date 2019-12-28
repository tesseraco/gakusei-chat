module.exports = (from, text) => {
  let message = {};
  message.from = from;
  message.text = text;
  message.createdAt = Date.now();
  return message;
}
