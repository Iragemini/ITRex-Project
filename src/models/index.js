import bcrypt from 'bcryptjs';
import Sequelize from 'sequelize';
import config from '../../config/config.js';
import User from './user.model.js';
import Role from './role.model.js';
import Patient from './patient.model.js';
import Doctor from './doctor.model.js';
import Specialization from './specialization.model.js';
import Resolution from './resolution.model.js';

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
  foreignKey: 'userId',
  otherKey: 'roleId',
});
db.role.belongsToMany(db.user, {
  through: 'user_roles',
  foreignKey: 'roleId',
  otherKey: 'userId',
});

db.user.hasOne(db.patient, {
  onDelete: 'cascade',
});
db.user.hasOne(db.doctor, {
  onDelete: 'cascade',
});

db.patient.belongsTo(db.user, {
  foreignKey: 'userId',
});
db.doctor.belongsTo(db.user, {
  foreignKey: 'userId',
});

db.doctor.belongsToMany(db.specialization, {
  through: 'doctor_specializations',
  foreignKey: 'doctorId',
  otherKey: 'specializationId',
});
db.specialization.belongsToMany(db.doctor, {
  through: 'doctor_specializations',
  foreignKey: 'specializationId',
  otherKey: 'doctorId',
});

db.patient.hasMany(db.resolution, {
  onDelete: 'cascade',
  truncate: true,
  hooks: true,
});
db.resolution.belongsTo(db.patient, {
  foreignKey: 'patientId',
});

const initRoles = async () => {
  await db.role.findOrCreate({
    where: { title: 'patient' },
    defaults: {
      id: 1,
      title: 'patient',
    },
  });
  await db.role.findOrCreate({
    where: { title: 'doctor' },
    defaults: {
      id: 2,
      title: 'doctor',
    },
  });

  await db.specialization.findOrCreate({
    where: { title: 'pediatrician' },
    defaults: {
      id: 1,
      title: 'pediatrician',
    },
  });
  await db.specialization.findOrCreate({
    where: { title: 'dermatologist' },
    defaults: {
      id: 2,
      title: 'dermatologist',
    },
  });
  await db.specialization.findOrCreate({
    where: { title: 'psychiatrist' },
    defaults: {
      id: 3,
      title: 'psychiatrist',
    },
  });
};

// seeding of doctors since we don't have registration for them
const initUsers = async () => {
  await db.user.findOrCreate({
    where: { email: 'doctor1@gmail.com' },
    defaults: {
      email: 'doctor1@gmail.com',
      password: bcrypt.hashSync('12345678', 8),
    },
  }).then((user) => {
    user[0].setRoles([2]);
  });
  await db.user.findOrCreate({
    where: { email: 'doctor2@gmail.com' },
    defaults: {
      email: 'doctor2@gmail.com',
      password: bcrypt.hashSync('12345678', 8),
    },
  }).then((user) => {
    user[0].setRoles([2]);
  });
  await db.user.findOrCreate({
    where: { email: 'doctor3@gmail.com' },
    defaults: {
      email: 'doctor3@gmail.com',
      password: bcrypt.hashSync('12345678', 8),
    },
  }).then((user) => {
    user[0].setRoles([2]);
  });
};

const initDoctors = async () => {
  await db.doctor.findOrCreate({
    where: { name: 'Lyolik' },
    defaults: {
      userId: 1,
      name: 'Lyolik',
    },
  }).then((doctor) => {
    doctor[0].setSpecializations([1]);
  });

  await db.doctor.findOrCreate({
    where: { name: 'Ms. Andersen' },
    defaults: {
      userId: 2,
      name: 'Ms. Andersen',
    },
  }).then((doctor) => {
    doctor[0].setSpecializations([2]);
  });

  await db.doctor.findOrCreate({
    where: { name: 'Mr. Lecter' },
    defaults: {
      userId: 3,
      name: 'Mr. Lecter',
    },
  }).then((doctor) => {
    doctor[0].setSpecializations([3]);
  });
};

db.init = async () => {
  if (process.env.NODE_ENV === 'local') {
    await db.sequelize.query('SET FOREIGN_KEY_CHECKS = 0', null, { raw: true });
    await db.sequelize.sync({ force: true });
    await db.sequelize.query('SET FOREIGN_KEY_CHECKS = 1', null, { raw: true });
  } else {
    db.sequelize.sync();
  }

  await initRoles();
  await initUsers();
  await initDoctors();
};

export default db;
