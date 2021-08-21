import MemoryQueue from './inMemory/queue.storage.js';
import MemoryResolution from './inMemory/resolution.storage.js';
import RedisQueue from './redis/queue.storage.js';
import RedisResolution from './redis/resolution.storage.js';
import config from '../../config/config.js';

const { type } = config;

class StorageManager {
  constructor() {
    this.type = type;
    this.list = {
      memory: {
        queue: MemoryQueue,
        resolution: MemoryResolution,
      },
      redis: {
        queue: RedisQueue,
        resolution: RedisResolution,
      },
    };
  }

  createStorage(table) {
    const StorageType = this.list[this.type][table];
    const storage = new StorageType();
    return storage;
  }
}

const factory = new StorageManager();

export default factory;
