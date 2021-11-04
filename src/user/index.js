import UserService from './user.service.js';
import patientService from '../patient/index.js';
import repository from '../repository/index.js';

const { user } = repository;

const userService = new UserService(user, patientService);

export default userService;
