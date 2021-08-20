import MemoryQueue from './inMemory/queue.storage.js';
import MemoryResolution from './inMemory/resolution.storage.js';
import RedisQueue from './redis/queue.storage.js';
import RedisResolution from './redis/resolution.storage.js';

class StorageManager {
  constructor() {
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

  createStorage(type = 'memory', table = 'queue') {
    const StorageType = this.list[type][table];
    const storage = new StorageType();
    return storage;
  }
}

const factory = new StorageManager();

export default factory;
