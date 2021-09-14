import { promisify } from 'util';
import jwt from 'jsonwebtoken';
import config from '../../config/config.js';
import ApiError from '../errors/ApiError.js';
import userService from '../user/index.js';

const {
  auth: { SECRET },
} = config;

const verifyToken = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization
    && req.headers.authorization.startsWith('Bearer')
  ) {
    [, token] = req.headers.authorization.split(' ');
  }

  if (!token) {
    throw new ApiError(401, 'No token provided!');
  }

  // checking for the wrong signature
  let decoded;

  try {
    decoded = await promisify(jwt.verify)(token, SECRET);
  } catch {
    throw new ApiError(401, 'Unauthorized!');
  }

  let user;

  try {
    user = await userService.getUserById(decoded.id);
    delete user.password;
  } catch {
    throw new ApiError(401, 'Unauthorized!');
  }

  req.user = user;

  next();
};

export default verifyToken;
