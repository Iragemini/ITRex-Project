import QueueService from './queue.service.js';
import factory from '../storage/factory.js';
import patientService from '../patient/index.js';
import doctorService from '../doctor/index.js';
import createClient from '../storage/redis/client.js';

const queueStorage = factory.createStorage(createClient);
queueStorage.reset();
const queueService = new QueueService(queueStorage, patientService, doctorService);

export default queueService;
