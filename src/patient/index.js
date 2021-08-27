import PatientService from './patient.service.js';
import { mysqlPatient } from '../repository/mysql/index.js';

const patientService = new PatientService(mysqlPatient);

export default patientService;
