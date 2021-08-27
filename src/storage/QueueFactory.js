import MemoryQueue from './inMemory/queue.storage.js';
import RedisQueue from './redis/queue.storage.js';

export default class QueueFactory {
  constructor(type) {
    this.type = type;
    this.list = {
      memory: {
        queue: MemoryQueue,
      },
      redis: {
        queue: RedisQueue,
      },
    };
  }

  createStorage(client) {
    const storageType = this.list[this.type];
    const StorageType = storageType.queue;
    const storage = new StorageType(client);
    return storage;
  }
}
