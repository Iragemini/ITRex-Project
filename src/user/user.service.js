import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import ApiError from '../errors/ApiError.js';
import config from '../../config/config.js';
import constants from '../utils/constants.js';

const {
  auth: { SECRET, JWT_EXPIRE_TIME, SALT },
} = config;

export default class UserService {
  constructor(repository, patientService, doctorService) {
    this.repository = repository;
    this.patientService = patientService;
    this.doctorService = doctorService;
  }

  checkNewUser = async (data) => {
    const {
      email,
      name,
      specializationId,
      role,
    } = data;

    const user = await this.repository.getUserByEmail(email);

    if (user) {
      throw new ApiError(409, 'Email already exists');
    }

    if (role === constants.roles.doctor) {
      await this.doctorService.checkData({ name, specializationId });
    }
  };

  checkPassword = (enteredPassword, userPassword) => {
    const isPasswordCorrect = bcrypt.compareSync(enteredPassword, userPassword);

    if (!isPasswordCorrect) {
      throw new ApiError(401, 'Invalid password');
    }
  };

  authenticate = async (user) => {
    const userEntity = await this.getUserByEmail(user.email);

    this.checkPassword(user.password, userEntity.password);

    const token = jwt.sign({ id: userEntity.id }, SECRET, {
      expiresIn: JWT_EXPIRE_TIME,
    });

    return { ...userEntity, token };
  };

  createUser = async (data) => {
    const {
      email,
      password,
      gender,
      birthDate,
      name,
      specializationId,
      role,
    } = data;

    await this.checkNewUser(data);

    const { id } = await this.repository.createUser({
      email,
      password: bcrypt.hashSync(password, SALT),
      role,
    });

    switch (role) {
      case constants.roles.patient:
        await this.patientService.addPatient({
          userId: id,
          name,
          email,
          gender,
          birthDate,
        });
        break;
      case constants.roles.doctor:
        await this.doctorService.createDoctor({
          userId: id,
          name,
          specializationId,
        });
        break;
      default:
        break;
    }
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
