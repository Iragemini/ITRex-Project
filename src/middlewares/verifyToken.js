import jwt from 'jsonwebtoken';
import config from '../../config/config.js';
import ApiError from '../errors/ApiError.js';

const {
  auth: { SECRET },
} = config;

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  const user = { userId: null };

  if (!token) {
    throw new ApiError(403, 'No token provided!');
  }

  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) {
      throw new ApiError(401, 'Unauthorized!');
    }
    user.userId = decoded.id;
    req.user = user;
    return next();
  });
};

export default verifyToken;
