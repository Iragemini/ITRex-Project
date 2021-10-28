import DoctorService from './doctor.service.js';
import repository from '../repository/index.js';

const { doctor } = repository;

const doctorService = new DoctorService(doctor);

export default doctorService;
