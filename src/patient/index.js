import factory from '../storage/factory.js';
import PatientService from './patient.service.js';

const patientStorage = factory.createStorage('patient');
const patientService = new PatientService(patientStorage);

export default patientService;
