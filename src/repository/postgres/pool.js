import pg from 'pg';
import config from '../../../config/config.js';

const {
  db: { postgres },
} = config;

const { Pool } = pg;

const initPG = () => {
  const pool = new Pool(postgres);

  console.log(`connected to PostgreSQL with USER '${postgres.user}' on port ${postgres.port}`);
  return pool;
};

export default initPG;
