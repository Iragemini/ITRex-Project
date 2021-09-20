import DoctorService from './doctor.service.js';
import { mysqlDoctor } from '../repository/mysql/index.js';

const doctorService = new DoctorService(mysqlDoctor);

export default doctorService;
