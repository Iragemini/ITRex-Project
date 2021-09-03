import Sequelize from 'sequelize';
import config from '../../config/config.js';
import Patient from './patient.model.js';
import Resolution from './resolution.model.js';
import User from './user.model.js';

const {
  db: { mysql },
} = config;

const sequelize = new Sequelize(mysql.db, mysql.user, mysql.password, {
  host: mysql.host,
  dialect: mysql.dialect,
  port: mysql.port,
  operatorsAliases: 0,

  pool: {
    max: mysql.pool.max,
    min: mysql.pool.min,
    acquire: mysql.pool.acquire,
    idle: mysql.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.patient = Patient(sequelize, Sequelize);
db.resolution = Resolution(sequelize, Sequelize);
db.user = User(sequelize, Sequelize);
db.patient.hasMany(db.resolution, { as: 'resolution' });
db.resolution.belongsTo(db.patient, {
  foreignKey: 'patient_id',
  as: 'patient',
});
db.patient.belongsTo(db.user, {
  foreignKey: 'user_id',
  as: 'user',
});

export default db;
