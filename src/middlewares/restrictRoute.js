import ApiError from '../errors/ApiError.js';

const restrictTo = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.roleTitle)) {
    return next(
      new ApiError(403, 'You do not have permission to perform this action.'),
    );
  }

  next();
};

export default restrictTo;
