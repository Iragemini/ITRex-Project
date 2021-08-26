import StorageManager from './StorageManager.js';
import redisClient from './redis/client.js';

const factory = new StorageManager({ redisClient });

export default factory;
