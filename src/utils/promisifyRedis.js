import { promisify } from 'util';

const promisifyRedis = (redisClient) => {
  const client = {};
  client.RPUSH = promisify(redisClient.RPUSH).bind(redisClient);
  client.LPOP = promisify(redisClient.LPOP).bind(redisClient);
  client.EXISTS = promisify(redisClient.EXISTS).bind(redisClient);
  client.LLEN = promisify(redisClient.LLEN).bind(redisClient);
  client.LRANGE = promisify(redisClient.LRANGE).bind(redisClient);
  client.LINDEX = promisify(redisClient.LINDEX).bind(redisClient);
  client.SET = promisify(redisClient.SET).bind(redisClient);
  client.SETEX = promisify(redisClient.SETEX).bind(redisClient);
  client.GET = promisify(redisClient.GET).bind(redisClient);
  client.APPEND = promisify(redisClient.APPEND).bind(redisClient);
  client.STRLEN = promisify(redisClient.STRLEN).bind(redisClient);
  client.KEYS = promisify(redisClient.KEYS).bind(redisClient);
  client.EXPIRE = promisify(redisClient.EXPIRE).bind(redisClient);
  client.FLUSHALL = promisify(redisClient.FLUSHALL).bind(redisClient);

  return client;
};

export default promisifyRedis;
