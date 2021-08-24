import { promisify } from 'util';

const promisifyRedis = (redisClient) => {
  const client = {};
  client.addInQueue = promisify(redisClient.RPUSH).bind(redisClient);
  client.deleteFromQueue = promisify(redisClient.LPOP).bind(redisClient);
  client.exists = promisify(redisClient.EXISTS).bind(redisClient);
  client.getLength = promisify(redisClient.LLEN).bind(redisClient);
  client.getList = promisify(redisClient.LRANGE).bind(redisClient);
  client.getByIndex = promisify(redisClient.LINDEX).bind(redisClient);
  client.setValue = promisify(redisClient.SET).bind(redisClient);
  client.setexValue = promisify(redisClient.SETEX).bind(redisClient);
  client.getValue = promisify(redisClient.GET).bind(redisClient);
  client.appendValue = promisify(redisClient.APPEND).bind(redisClient);
  client.valueLength = promisify(redisClient.STRLEN).bind(redisClient);
  client.getKeys = promisify(redisClient.KEYS).bind(redisClient);
  client.setExpiration = promisify(redisClient.EXPIRE).bind(redisClient);
  client.flushall = promisify(redisClient.FLUSHALL).bind(redisClient);

  return client;
};

export default promisifyRedis;
