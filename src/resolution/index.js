import ResolutionService from './resolution.service.js';
import patientService from '../patient/index.js';
import doctorService from '../doctor/index.js';
import repository from '../repository/index.js';

const client = repository.createRepository();

const resolutionService = new ResolutionService(client.resolution, patientService, doctorService);

export default resolutionService;
