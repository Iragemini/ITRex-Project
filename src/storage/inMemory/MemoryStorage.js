import { Queue } from './queue.storage.js';
import { Patients } from './resolution.storage.js';

export class MemoryStorage {
  constructor(type) {
    this.type = type;
    this.storageClass = Queue;
  }

  createStorage() {
    switch (this.type) {
      case 'queue':
        this.storageClass = Queue;
        break;
      case 'resolution':
        this.storageClass = Patients;
        break;
    }
    return new this.storageClass();
  }
}
