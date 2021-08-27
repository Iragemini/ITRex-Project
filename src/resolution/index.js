import ResolutionService from './resolution.service.js';
import patientService from '../patient/index.js';
import { mysqlResolution } from '../repository/mysql/index.js';

const resolutionService = new ResolutionService(mysqlResolution, patientService);

export default resolutionService;
