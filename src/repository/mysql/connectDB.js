import db from '../../models/index.js';
import config from '../../../config/config.js';

const {
  db: { dbType },
} = config;

const connectSequelize = async () => {
  if (dbType !== 'mysql') {
    return;
  }
  await db.init();
};

export default connectSequelize;
