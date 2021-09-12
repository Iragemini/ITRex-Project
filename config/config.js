export default {
  server: {
    port: process.env.PORT || 3000,
  },
  ttl: -1,
  storage: {
    queueType: 'redis' /* redis, memory */,
    redis: {
      client: {
        port: process.env.REDIS_PORT || 6379,
        host: process.env.REDIS_HOST || '127.0.0.1',
      },
    },
  },
  db: {
    mysql: {
      host: process.env.DB_HOST || '127.0.0.1',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '7895leon',
      db: process.env.DB_NAME || 'clinic',
      port: process.env.DB_PORT || 3306,
      dialect: 'mysql',
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
      },
    },
  },
  auth: {
    SECRET: process.env.JWT_SECRET || 'secret',
    MIN_PASSWORD_LENGTH: 4,
    JWT_EXPIRE_TIME: 86400, // 24 hours
  },
};
