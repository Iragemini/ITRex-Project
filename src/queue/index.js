import QueueService from './queue.service.js';
import factory from '../storage/factory.js';
import patientService from '../patient/index.js';
import redisClient from '../storage/redis/client.js';
import config from '../../config/config.js';

const {
  storage: { queueType },
} = config;

const client = queueType === 'memory' ? [] : redisClient;

const queueStorage = factory.createStorage(client);
const queueService = new QueueService(queueStorage, patientService);

export default queueService;
