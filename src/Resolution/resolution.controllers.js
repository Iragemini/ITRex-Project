import {
  addResolution,
  findResolution,
  deleteResolution,
} from './resolution.service.js';
import AppError from '../Errors/AppError.js';

export const add = async (req, res) => {
  const name = req.params.name;
  const resolution = req.body.doctorResolution;
  if (!name || !resolution) {
    throw new AppError(400);
  }
  const ttl = req.body.ttlInput;
  await addResolution(name, resolution, ttl);
  res.status(200).redirect('/');
};

export const find = async (req, res) => {
  const resolution = await findResolution(req.params.name);
  res.status(200).send(JSON.stringify(resolution));
};

export const remove = async (req, res) => {
  await deleteResolution(req.params.name);
  res.sendStatus(204);
};
