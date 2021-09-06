import UserService from './user.service.js';
import { mysqlUser } from '../repository/mysql/index.js';
import patientService from '../patient/index.js';

const userService = new UserService(mysqlUser, patientService);

export default userService;
