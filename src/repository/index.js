import MySQLPatient from './mysql/patient.js';
import MySQLDoctor from './mysql/doctor.js';
import MySQLResolution from './mysql/resolution.js';
import MySQLUser from './mysql/user.js';
import PGPatient from './postgres/patient.js';
import PGDoctor from './postgres/doctor.js';
import PGResolution from './postgres/resolution.js';
import PGUser from './postgres/user.js';
import db from '../models/index.js';
import initPG from './postgres/pool.js';
import config from '../../config/config.js';
import constants from '../utils/constants.js';

const {
  db: { dbType },
} = config;

const pool = initPG();

class RepositoryFactory {
  constructor(type) {
    this.type = type;
  }

  createRepository() {
    if (this.type === constants.repositoryTypes.mysql) {
      return {
        user: new MySQLUser(db),
        patient: new MySQLPatient(db),
        resolution: new MySQLResolution(db),
        doctor: new MySQLDoctor(db),
      };
    }
    return {
      user: new PGUser(pool),
      patient: new PGPatient(pool),
      resolution: new PGResolution(pool),
      doctor: new PGDoctor(pool),
    };
  }
}

const repository = new RepositoryFactory(dbType);

export default repository;
