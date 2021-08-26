export default {
  server: {
    port: process.env.PORT || 3000,
  },
  type: 'redis',
  db: 'mysql',
  ttl: -1,
  storage: {
    redis: {
      client: {
        port: process.env.REDIS_PORT || 6379,
        host: process.env.REDIS_HOST || '127.0.0.1',
      },
    },
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
  },
};
