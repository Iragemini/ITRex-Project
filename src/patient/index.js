import PatientService from './patient.service.js';
import repository from '../repository/index.js';

const { patient } = repository;

const patientService = new PatientService(patient);

export default patientService;
