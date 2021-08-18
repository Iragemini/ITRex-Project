export default {
  memory: {
    type: 0,
  },
  redis: {
    type: 1,
    client: {
      port: 6379,
      host: process.env.REDISHOST || '127.0.0.1',
    },
  },
};