const redis = require('redis');

const redisClient = redis.createClient({
  host: 'test',
  port: 'test',
  retry_strategy: () => 1000
});

module.exports = redisClient;
