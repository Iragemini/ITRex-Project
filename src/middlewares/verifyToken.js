import jwt from 'jsonwebtoken';
import config from '../../config/config.js';
import ApiError from '../errors/ApiError.js';

const {
  auth: { SECRET },
} = config;

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    throw new ApiError(403, 'No token provided!');
  }

  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) {
      throw new ApiError(401, 'Unauthorized!');
    }
    req.userId = decoded.id;
    return next();
  });
};

export default verifyToken;
