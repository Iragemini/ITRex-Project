import MemoryQueue from './inMemory/queue.storage.js';
import MemoryResolution from './inMemory/resolution.storage.js';
import MemoryPatient from './inMemory/patient.storage.js';
import RedisQueue from './redis/queue.storage.js';
import RedisResolution from './redis/resolution.storage.js';
import RedisPatient from './redis/patient.storage.js';
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
        patient: MemoryPatient,
        storage: [],
      },
      redis: {
        queue: RedisQueue,
        resolution: RedisResolution,
        patient: RedisPatient,
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
