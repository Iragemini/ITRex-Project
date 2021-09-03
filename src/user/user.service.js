import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import ApiError from '../errors/ApiError.js';
import config from '../../config/config.js';

const {
  auth: { SECRET, JWT_EXPIRE_TIME },
} = config;

export default class UserService {
  constructor(repository) {
    this.repository = repository;
  }

  authenticate = async (user) => {
    const userEntity = await this.getUserByEmail(user.email);

    const isValidPassword = bcrypt.compareSync(user.password, userEntity.password);
    if (!isValidPassword) {
      throw new ApiError(401, 'Invalid password');
    }

    const token = jwt.sign({ id: userEntity.id }, SECRET, {
      expiresIn: JWT_EXPIRE_TIME,
    });
    return { accessToken: token, name: user.name };
  };

  createUser = async (data) => {
    const hashData = Object.create(data);
    hashData.password = bcrypt.hashSync(hashData.password, 8);
    await this.repository.createUser(hashData);
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
      throw new ApiError(404, 'User not exists');
    }
    return user;
  };

  updateUser = async (id, data) => {
    await this.repository.updateUser(id, data);
  };

  deleteUser = async (userId) => {
    await this.repository.deleteUser(userId);
  };
}
