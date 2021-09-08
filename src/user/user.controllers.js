import userService from './index.js';

export const authenticate = async (req, res, next) => {
  const user = await userService.authenticate(req.body);
  res.status(200).json({
    message: 'Authenticated',
    ...user,
  });
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
