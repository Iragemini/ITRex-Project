import { promisify } from 'util';

const promisifyRedis = (redisClient) => {
  const client = {};
  client.RPUSH = promisify(redisClient.RPUSH).bind(redisClient);
  client.LRANGE = promisify(redisClient.LRANGE).bind(redisClient);
  client.LLEN = promisify(redisClient.LLEN).bind(redisClient);
  client.LPOP = promisify(redisClient.LPOP).bind(redisClient);
  client.LINDEX = promisify(redisClient.LINDEX).bind(redisClient);
  client.FLUSHALL = promisify(redisClient.FLUSHALL).bind(redisClient);

  return client;
};

export default promisifyRedis;
