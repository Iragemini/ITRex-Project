import redis from 'redis';
import config from '../../../config/config.js';

const {
  storage: {
    redis: {
      client: { host, port },
    },
  },
} = config;

const redisClient = redis.createClient({ host, port });

export default redisClient;
