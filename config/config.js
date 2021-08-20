export default {
  server: {
    port: process.env.PORT || 3000,
  },
  type: 'memory',
  ttl: -1,
  storage: {
    memory: {
      type: 'memory',
    },
    redisDB: {
      type: 'redis',
      client: {
        port: 6379,
        host: process.env.REDIS_HOST || '127.0.0.1',
      },
    },
  },
};
