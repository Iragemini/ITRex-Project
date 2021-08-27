import MySQLPatient from './patient.js';
import MySQLResolution from './resolution.js';
import db from '../../models/index.js';

export const mysqlPatient = new MySQLPatient(db);
export const mysqlResolution = new MySQLResolution(db);
