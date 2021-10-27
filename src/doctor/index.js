import DoctorService from './doctor.service.js';
import repository from '../repository/index.js';

const client = repository.createRepository();

const doctorService = new DoctorService(client.doctor);

export default doctorService;
