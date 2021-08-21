export default {
  server: {
    port: process.env.PORT || 3000,
  },
  type: 'memory',
  ttl: -1,
  storage: {
    redisDB: {
      client: {
        port: process.env.REDIS_PORT || 6379,
        host: process.env.REDIS_HOST || '127.0.0.1',
      },
    },
  },
};
