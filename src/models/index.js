import Sequelize from 'sequelize';
import config from '../../config/config.js';
import User from './user.model.js';
import Role from './role.model.js';
import Patient from './patient.model.js';
import Doctor from './doctor.model.js';
import Specialization from './specialization.model.js';
import Resolution from './resolution.model.js';
import seed from './seeding.js';

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

db.user = User(sequelize, Sequelize);
db.role = Role(sequelize, Sequelize);
db.doctor = Doctor(sequelize, Sequelize);
db.specialization = Specialization(sequelize, Sequelize);
db.patient = Patient(sequelize, Sequelize);
db.resolution = Resolution(sequelize, Sequelize);

// associations
db.user.belongsToMany(db.role, {
  through: 'user_roles',
  foreignKey: 'user_id',
  otherKey: 'role_id',
});
db.role.belongsToMany(db.user, {
  through: 'user_roles',
  foreignKey: 'role_id',
  otherKey: 'user_id',
});

db.user.hasOne(db.patient, {
  foreignKey: 'user_id',
  onDelete: 'cascade',
});
db.user.hasOne(db.doctor, {
  foreignKey: 'user_id',
  onDelete: 'cascade',
});

db.patient.belongsTo(db.user, {
  foreignKey: 'user_id',
});
db.doctor.belongsTo(db.user, {
  foreignKey: 'user_id',
});

db.doctor.belongsToMany(db.specialization, {
  through: 'doctor_specializations',
  foreignKey: 'doctor_id',
  otherKey: 'specialization_id',
});
db.specialization.belongsToMany(db.doctor, {
  through: 'doctor_specializations',
  foreignKey: 'specialization_id',
  otherKey: 'doctor_id',
});

db.patient.hasMany(db.resolution, {
  foreignKey: 'patient_id',
  onDelete: 'cascade',
  truncate: true,
  hooks: true,
});
db.resolution.belongsTo(db.patient, {
  foreignKey: 'patient_id',
});

db.init = async () => {
  if (process.env.NODE_ENV === 'local') {
    await db.sequelize.query('SET FOREIGN_KEY_CHECKS = 0', null, { raw: true });
    await db.sequelize.sync({ force: true });
    await db.sequelize.query('SET FOREIGN_KEY_CHECKS = 1', null, { raw: true });
  } else {
    await db.sequelize.sync();
  }

  await seed(db);
};

export default db;
