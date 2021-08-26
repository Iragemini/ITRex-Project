import MemoryQueue from './inMemory/queue.storage.js';
import MemoryResolution from './inMemory/resolution.storage.js';
import MemoryPatient from './inMemory/patient.storage.js';
import RedisQueue from './redis/queue.storage.js';
import RedisResolution from './redis/resolution.storage.js';
import RedisPatient from './redis/patient.storage.js';
import MySQLResolution from './mysql/resolution.storage.js';
import MySQLPatient from './mysql/patient.storage.js';
import config from '../../config/config.js';
import promisifyRedis from '../utils/promisifyRedis.js';

const { type } = config;

export default class StorageManager {
  constructor(options) {
    this.options = options;
    this.redisClient = promisifyRedis(this.options.redisClient);
    this.db = this.options.db;
    this.type = type;
    this.list = {
      memory: {
        queue: MemoryQueue,
        resolution: MemoryResolution,
        patient: MemoryPatient,
        storage: {
          queue: [],
          patient: [],
          resolution: [],
        },
        connect: () => {},
      },
      redis: {
        queue: RedisQueue,
        resolution: RedisResolution,
        patient: RedisPatient,
        storage: {
          queue: this.redisClient,
          patient: this.redisClient,
          resolution: this.redisClient,
        },
        connect: () => StorageManager.redisConnect(this.options.redisClient),
      },
      db: {
        queue: RedisQueue,
        resolution: MySQLResolution,
        patient: MySQLPatient,
        connect: () => StorageManager.redisConnect(this.options.redisClient),
        storage: {
          queue: this.redisClient,
          patient: options.db,
          resolution: options.db,
        },
      },
    };
  }

  static redisConnect(redisClient) {
    redisClient.on('error', (err) => {
      console.log('Error ', err);
    });
    redisClient.on('connect', () => {
      console.log('connect');
    });
  }

  createStorage(table) {
    const storageType = this.list[this.type];
    const StorageType = storageType[table];
    const storage = new StorageType(storageType.storage[table]);
    storageType.connect();
    return storage;
  }
}
