import MemoryQueue from './inMemory/queue.storage.js';
import MemoryResolution from './inMemory/resolution.storage.js';
import MemoryPatient from './inMemory/patient.storage.js';
import RedisQueue from './redis/queue.storage.js';
import RedisResolution from './redis/resolution.storage.js';
import RedisPatient from './redis/patient.storage.js';
import config from '../../config/config.js';
import promisifyRedis from '../utils/promisifyRedis.js';

const { type } = config;

export default class StorageManager {
  constructor(options) {
    this.options = options;
    this.redisClient = options.redisClient;
    this.type = type;
    this.list = {
      memory: {
        queue: MemoryQueue,
        resolution: MemoryResolution,
        patient: MemoryPatient,
        storage: [],
        connect: () => {},
      },
      redis: {
        queue: RedisQueue,
        resolution: RedisResolution,
        patient: RedisPatient,
        storage: promisifyRedis(this.redisClient),
        connect: () => {
          this.redisClient.on('error', (err) => {
            console.log('Error ', err);
          });
          this.redisClient.on('connect', () => {
            console.log('connect');
          });
        },
      },
    };
  }

  createStorage(table) {
    const storageType = this.list[this.type];
    const StorageType = storageType[table];
    const storage = new StorageType(storageType.storage);
    storageType.connect();
    return storage;
  }
}
