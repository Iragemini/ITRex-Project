import redis from 'redis';
import config from '../../../config/config.js';
import promisifyRedis from '../../utils/promisifyRedis.js';

const {
  storage: {
    redis: {
      client: { host, port },
    },
  },
} = config;

const createClient = (type) => {
  const redisClient = redis.createClient({ host, port });

  redisClient.on('error', (err) => {
    console.log('Error ', err);
  });

  redisClient.on('connect', () => {
    console.log(`${type} connect`);
  });

  return promisifyRedis(redisClient);
};

export default createClient;
