import userService from './index.js';

export const authenticate = async (req, res, next) => {
  const user = await userService.authenticate(req.body);

  const { token } = user;

  user.token = undefined;
  user.password = undefined;

  // temporary cookie for the front-end
  const cookieOptions = {
    expires: new Date(
      Date.now() + 90 * 24 * 60 * 60 * 1000, // 90 days
    ),
    httpOnly: true,
  };

  res.cookie('jwt', token, cookieOptions);

  res.status(200).json({
    message: 'Authenticated',
    token,
    data: { ...user },
  });
};

export const signout = (req, res) => {
  res.cookie('jwt', 'signed-out', {
    expires: new Date(Date.now() + 60 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ status: 'success' });
};

export const create = async (req, res, next) => {
  await userService.createUser(req.body);

  res.sendStatus(201);
};

export const update = async (req, res, next) => {
  const { userId } = req.user;
  const user = await userService.updateUser(userId);

  res.status(200).json(user);
};

export const remove = async (req, res, next) => {
  const { userId } = req.user;
  await userService.deleteUser(userId);

  res.sendStatus(204);
};
