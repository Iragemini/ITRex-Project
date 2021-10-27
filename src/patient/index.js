import PatientService from './patient.service.js';
import repository from '../repository/index.js';

const client = repository.createRepository();

const patientService = new PatientService(client.patient);

export default patientService;
