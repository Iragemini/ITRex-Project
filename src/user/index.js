import UserService from './user.service.js';
import patientService from '../patient/index.js';
import repository from '../repository/index.js';

const client = repository.createRepository();

const userService = new UserService(client.user, patientService);

export default userService;
