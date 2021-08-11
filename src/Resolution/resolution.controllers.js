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
  try {
    await addResolution(name, resolution, ttl);
    res.status(200).redirect('/');
  } catch (e) {
    console.log(e);
  }
};

export const find = async (req, res) => {
  try {
    const resolution = await findResolution(req.params.name);
    res.status(200).send(JSON.stringify(resolution));
  } catch (e) {
    console.log(e);
  }
};

export const remove = async (req, res) => {
  try {
    await deleteResolution(req.params.name);
    res.sendStatus(204);
  } catch (e) {
    console.log(e);
  }
};
