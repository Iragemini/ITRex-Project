import redis from 'redis';
import promisifyRedis from '../../utils/promisifyRedis.js';
import config from '../../../config/config.js';

const {
  storage: {
    redisDB: {
      client: { host, port },
    },
  },
} = config;

const redisClient = redis.createClient({ host, port });

redisClient.on('error', (err) => {
  console.log('Error ', err);
});

redisClient.on('connect', () => {
  console.log('connect');
});

export default promisifyRedis(redisClient);
