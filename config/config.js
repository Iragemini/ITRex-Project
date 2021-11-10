export default {
  server: {
    port: process.env.PORT || 3000,
  },
  ttl: -1,
  storage: {
    redis: {
      client: {
        port: process.env.REDIS_PORT || 6379,
        host: process.env.REDIS_HOST || '127.0.0.1',
      },
      cacheTTL: 1000, /* seconds */
    },
  },
  db: {
    dbType: 'postgres' /* 'postgres', 'mysql' */,
    mysql: {
      host: process.env.DB_HOST || '127.0.0.1',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || 'root',
      db: process.env.DB_NAME || 'med_center',
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
      user: process.env.DB_PG_USER || 'client',
      password: process.env.DB_PG_PASSWORD || 'client',
      host: process.env.DB_PG_HOST || '127.0.0.1',
      port: process.env.DB_PG_PORT || 5432,
      database: process.env.DB_NAME || 'med_center',
    },
  },
  auth: {
    SECRET: process.env.JWT_SECRET || 'secret',
    MIN_PASSWORD_LENGTH: 4,
    JWT_EXPIRE_TIME: 86400, // 24 hours
  },
};
