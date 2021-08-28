import QueueService from './queue.service.js';
import factory from '../storage/factory.js';
import patientService from '../patient/index.js';
import createClient from '../storage/redis/client.js';
import config from '../../config/config.js';

const {
  storage: { queueType },
} = config;

const client = queueType === 'memory' ? [] : createClient;

const queueStorage = factory.createStorage(client);
queueStorage.reset();
const queueService = new QueueService(queueStorage, patientService);

export default queueService;
