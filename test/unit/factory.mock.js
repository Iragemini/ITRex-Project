import redis from 'redis-mock';
import StorageManager from '../../src/storage/StorageManager.js';
import config from '../../config/config.js';

const {
  storage: {
    redis: {
      client: { host, port },
    },
  },
} = config;

const factoryMock = new StorageManager({ redisClient: redis.createClient({ host, port }) });

export default factoryMock;
