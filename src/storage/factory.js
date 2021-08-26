import StorageManager from './StorageManager.js';
import redisClient from './redis/client.js';
import db from '../models/index.js';

const factory = new StorageManager({ redisClient, db });

export default factory;
