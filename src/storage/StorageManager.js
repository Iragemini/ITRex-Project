import { Queue as MemoryQueue } from './inMemory/queue.storage.js';
import { Resolution as MemoryResolution } from './inMemory/resolution.storage.js';
import { Queue as RedisQueue } from './redis/queue.storage.js';
import { Resolution as RedisResolution } from './redis/resolution.storage.js';

class StorageManager {
  static list = {
    memory: {
      queue: MemoryQueue,
      resolution: MemoryResolution,
    },
    redis: {
      queue: RedisQueue,
      resolution: RedisResolution,
    },
  };

  createStorage(type = 'memory', table = 'queue') {
    const StorageType = StorageManager.list[type][table];
    const storage = new StorageType();
    return storage;
  }
}

export const factory = new StorageManager();
