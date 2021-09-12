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
    throw new ApiError(403, 'No token provided!');
  }

  let decoded;

  // checking for the wrong signature
  try {
    decoded = await promisify(jwt.verify)(token, SECRET);
  } catch (error) {
    return next(new ApiError(401, 'The token is invalid.'));
  }

  // added a check for no user
  try {
    const user = await userService.getUserById(decoded.id);
    req.user = user;
  } catch (error) {
    return next(new ApiError(401, 'The token is invalid.'));
  }

  req.user.password = undefined;

  next();
};

export default verifyToken;
