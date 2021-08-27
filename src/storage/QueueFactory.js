import MemoryQueue from './inMemory/queue.storage.js';
import RedisQueue from './redis/queue.storage.js';

export default class QueueFactory {
  constructor(type) {
    this.type = type;
    this.list = {
      memory: MemoryQueue,
      redis: RedisQueue,
    };
  }

  createStorage(client) {
    const StorageType = this.list[this.type];
    const storage = new StorageType(client);
    return storage;
  }
}
