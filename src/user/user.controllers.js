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

export const get = async (req, res, next) => {
  const { email } = req.params;
  const user = await userService.getUserByEmail(email);
  res.status(200).json(user);
};

export const update = async (req, res, next) => {
  const { id } = req.params;
  const user = await userService.updateUser(id);
  res.status(200).json(user);
};

export const remove = async (req, res, next) => {
  const { id } = req.params;
  await userService.deleteUser(id);
  res.sendStatus(204);
};
