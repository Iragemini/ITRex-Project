import MemoryQueue from './inMemory/queue.storage.js';
import MemoryResolution from './inMemory/resolution.storage.js';
import RedisQueue from './redis/queue.storage.js';
import RedisResolution from './redis/resolution.storage.js';
import config from '../../config/config.js';
import redisClient from './redis/client.js';

const { type } = config;

class StorageManager {
  constructor() {
    this.type = type;
    this.list = {
      memory: {
        queue: MemoryQueue,
        resolution: MemoryResolution,
        storage: [],
      },
      redis: {
        queue: RedisQueue,
        resolution: RedisResolution,
        storage: redisClient,
      },
    };
  }

  createStorage(table) {
    const StorageType = this.list[this.type][table];
    const storage = new StorageType(this.list[this.type].storage);
    return storage;
  }
}

const factory = new StorageManager();

export default factory;
