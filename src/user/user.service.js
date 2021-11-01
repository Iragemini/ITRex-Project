import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import ApiError from '../errors/ApiError.js';
import config from '../../config/config.js';
import constants from '../utils/constants.js';

const {
  auth: { SECRET, JWT_EXPIRE_TIME, SALT },
} = config;

export default class UserService {
  constructor(repository, patientService) {
    this.repository = repository;
    this.patientService = patientService;
  }

  checkIsEmailExists = async (email) => {
    const user = await this.repository.getUserByEmail(email);
    if (user) {
      return true;
    }
    return false;
  };

  authenticate = async (user) => {
    const userEntity = await this.getUserByEmail(user.email);

    const isValidPassword = bcrypt.compareSync(user.password, userEntity.password);

    if (!isValidPassword) {
      throw new ApiError(401, 'Invalid password');
    }

    const token = jwt.sign({ id: userEntity.id }, SECRET, {
      expiresIn: JWT_EXPIRE_TIME,
    });

    return { ...userEntity, token };
  };

  createUser = async (data) => {
    // basically we can create only patients this way
    const {
      email,
      password,
      gender,
      birthDate,
      name,
    } = data;

    const userData = {
      email,
      password: bcrypt.hashSync(password, SALT),
      role: constants.roles.patient,
    };

    const isEmailExists = await this.checkIsEmailExists(email);

    if (isEmailExists) {
      throw new ApiError(400, 'Email already exists');
    }

    const { id } = await this.repository.createUser(userData);

    await this.patientService.addPatient({
      userId: id,
      name,
      email,
      gender,
      birthDate,
    });
  };

  getUserByEmail = async (email) => {
    const user = await this.repository.getUserByEmail(email);

    if (!user) {
      throw new ApiError(404, `User for ${email} not found`);
    }

    return user;
  };

  getUserById = async (id) => {
    const user = await this.repository.getUserById(id);

    if (!user) {
      throw new ApiError(404, 'User doesn\'t exist');
    }

    return user;
  };
}
