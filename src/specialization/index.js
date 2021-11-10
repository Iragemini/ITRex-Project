import SpecializationService from './specialization.service.js';
import repository from '../repository/index.js';

const { specialization } = repository;

const specializationService = new SpecializationService(specialization);

export default specializationService;
