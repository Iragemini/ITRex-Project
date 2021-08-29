import createClient from './redisClient.js';
import QueueService from '../../src/queue/queue.service.js';
import ResolutionService from '../../src/resolution/resolution.service.js';
import MySQLResolution from '../../src/repository/mysql/resolution.js';
import patientService from '../../src/patient/index.js';
import config from '../../config/config.js';
import factory from '../../src/storage/factory.js';
import db from './db.js';

const {
  storage: { queueType },
} = config;

const client = queueType === 'redis' ? createClient : [];

export const queueStorage = factory.createStorage(client);
export const queueService = new QueueService(queueStorage, patientService);

export const mysqlResolution = new MySQLResolution(db);
export const resolutionService = new ResolutionService(mysqlResolution, patientService);

export default patientService;
