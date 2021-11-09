import QueueService from './queue.service.js';
import patientService from '../patient/index.js';
import doctorService from '../doctor/index.js';
import createClient from '../storage/redis/client.js';
import RedisQueue from '../storage/redis/queue.storage.js';

const queueStorage = new RedisQueue(createClient);
queueStorage.reset();
const queueService = new QueueService(queueStorage, patientService, doctorService);

export default queueService;
