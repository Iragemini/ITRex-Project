import { promisify } from 'util';
import jwt from 'jsonwebtoken';
import config from '../../config/config.js';
import ApiError from '../errors/ApiError.js';
import userService from '../user/index.js';

const {
  auth: { SECRET },
} = config;

// should be in the auth controller?
const verifyToken = async (req, res, next) => {
  let token;

  // added bearer token auth + temporary cookie auth for our front-end
  if (
    req.headers.authorization
    && req.headers.authorization.startsWith('Bearer')
  ) {
    /* eslint prefer-destructuring: 0 */
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
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

  // added a check for no user
  let user;

  try {
    user = await userService.getUserById(decoded.id);
  } catch {
    throw new ApiError(401, 'Unauthorized!');
  }

  req.user = user;
  req.user.password = undefined;

  next();
};

export default verifyToken;
