import db from '../models/index.js';
import ApiError from '../errors/ApiError.js';

const User = db.user;

export const verifyUserId = async (req, res, next) => {
  const user = await User.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!user) {
    throw new ApiError(404, 'User not exists');
  }
  return next();
};

export const verifyUserEmail = async (req, res, next) => {
  const user = await User.findOne({
    where: {
      email: req.body.email,
    },
  });
  if (!user) {
    throw new ApiError(404, 'User not exists');
  }
  return next();
};
