import MySQLPatient from './patient.js';
import MySQLResolution from './resolution.js';
import MySQLUser from './user.js';
import db from '../../models/index.js';

export const mysqlPatient = new MySQLPatient(db);
export const mysqlResolution = new MySQLResolution(db);
export const mysqlUser = new MySQLUser(db);
