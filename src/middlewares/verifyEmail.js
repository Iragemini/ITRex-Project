import db from '../models/index.js';
import ApiError from '../errors/ApiError.js';

const User = db.user;

const verifyEmail = async (req, res, next) => {
  const user = await User.findOne({
    where: {
      email: req.body.email,
    },
  });
  if (user) {
    throw new ApiError(400, 'Email is already exists');
  }
  return next();
};

export default verifyEmail;
