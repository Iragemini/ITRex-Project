import UserService from './user.service.js';
import { mysqlUser } from '../repository/mysql/index.js';

const userService = new UserService(mysqlUser);

export default userService;
