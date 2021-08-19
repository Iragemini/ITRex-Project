import { QueueService } from '../queue/queue.service.js';
import { ResolutionService } from '../resolution/resolution.service.js';
import { factory } from '../storage/StorageManager.js';
import config from '../../config/config.js';
const { type } = config;

export const service = (table) => {
  const storage = factory.createStorage(type, table);
  let ServiceInstance = QueueService;
  switch (table) {
    case 'queue':
      ServiceInstance = QueueService;
      break;
    case 'resolution':
      ServiceInstance = ResolutionService;
      break;
  }
  return new ServiceInstance(storage);
};
