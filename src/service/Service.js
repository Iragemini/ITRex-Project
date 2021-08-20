import QueueService from '../queue/queue.service.js';
import ResolutionService from '../resolution/resolution.service.js';
import factory from '../storage/StorageManager.js';
import config from '../../config/config.js';

const { type } = config;

const service = (table) => {
  const storage = factory.createStorage(type, table);
  let ServiceInstance;
  switch (table) {
    case 'queue':
      ServiceInstance = QueueService;
      break;
    case 'resolution':
      ServiceInstance = ResolutionService;
      break;
    default:
      ServiceInstance = QueueService;
      break;
  }
  return new ServiceInstance(storage);
};

export default service;
