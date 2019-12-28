module.exports = (message) => {
  return typeof message == 'string' && message.trim().length > 0;
};
