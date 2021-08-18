import { MemoryStorage } from './inMemory/MemoryStorage.js';
import { RedisStorage } from './redis/RedisStorage.js';

export class StorageManager {
  /**
   * @param {string} type - storage type (see ./config/storage.js)
   */
  constructor(type, table) {
    this.type = type;
    this.table = table;
    this.storageClass = MemoryStorage;
  }

  createStorage() {
    switch (this.type) {
      case 0:
        this.storageClass = MemoryStorage;
        break;
      case 1:
        this.storageClass = RedisStorage;
        break;
    }
    return new this.storageClass(this.table).createStorage();
  }
}
