import redis from 'redis';
import { promisify } from 'util';
import config from '../../../config/config.js';
const {
  storage: {
    redisDB: {
      client: { host, port },
    },
  },
} = config;

const client = redis.createClient({ host, port });

client.on('error', (err) => {
  console.log('Error ', err);
});

client.on('connect', (err) => {
  console.log('connect');
});

export const addInQueue = promisify(client.RPUSH).bind(client);
export const deleteFromQueue = promisify(client.LPOP).bind(client);
export const exists = promisify(client.EXISTS).bind(client);
export const getLength = promisify(client.LLEN).bind(client);
export const getList = promisify(client.LRANGE).bind(client);
export const getByIndex = promisify(client.LINDEX).bind(client);

export const setValue = promisify(client.SET).bind(client);
export const setexValue = promisify(client.SETEX).bind(client);
export const getValue = promisify(client.GET).bind(client);
export const appendValue = promisify(client.APPEND).bind(client);
export const valueLength = promisify(client.STRLEN).bind(client);
export const getKeys = promisify(client.KEYS).bind(client);
export const setExpiration = promisify(client.EXPIRE).bind(client);
