import PGPatient from './patient.js';
import PGDoctor from './doctor.js';
import PGResolution from './resolution.js';
import PGUser from './user.js';
import initPG from './pool.js';

const pool = initPG();

export const pgUser = new PGUser(pool);
export const pgPatient = new PGPatient(pool);
export const pgResolution = new PGResolution(pool);
export const pgDoctor = new PGDoctor(pool);
