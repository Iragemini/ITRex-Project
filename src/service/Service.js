import { QueueService } from '../queue/queue.service.js';
import { ResolutionService } from '../resolution/resolution.service.js';
import { StorageManager } from '../storage/StorageManager.js';
import config from '../../config/config.js';
const storageType = config.storage.type;

export class Service {
  constructor(table) {
    this.storageType = storageType;
    this.table = table;
    this.service = QueueService;
  }

  createService() {
    const storage = new StorageManager(this.storageType, this.table);
    switch (this.table) {
      case 'queue':
        this.service = QueueService;
        break;
      case 'resolution':
        this.service = ResolutionService;
        break;
    }
    return new this.service(storage.createStorage());
  }
}
