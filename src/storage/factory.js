import QueueFactory from './QueueFactory.js';
import config from '../../config/config.js';

const {
  storage: { queueType },
} = config;

const factory = new QueueFactory(queueType);

export default factory;
