export default {
  server: {
    port: process.env.PORT || 3000,
  },
  ttl: -1,
  storage: {
    queueType: 'redis',
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
      password: process.env.DB_PASSWORD || 'root',
      db: process.env.DB_NAME || 'itrex-mysql',
      port: process.env.DB_PORT || 3306,
      dialect: 'mysql',
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
      },
    },
    postgres: {
      host: process.env.DB_PG_HOST || '127.0.0.1',
      user: process.env.DB_PG_USER || 'postgres',
      password: process.env.DB_PG_PASSWORD || 'root',
      db: process.env.DB_PG_NAME || 'itrex-pg',
      port: process.env.DB_PG_PORT || 5432,
    },
  },
  auth: {
    SECRET: process.env.JWT_SECRET || 'secret',
    MIN_PASSWORD_LENGTH: 4,
    JWT_EXPIRE_TIME: 86400, // 24 hours
  },
};
