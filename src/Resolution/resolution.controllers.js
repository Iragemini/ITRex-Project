import {
  addResolution,
  findResolution,
  deleteResolution,
} from './resolution.service.js';
import ApiError from '../errors/ApiError.js';

export const add = async (req, res, next) => {
  const name = req.params.name;
  const resolution = req.body.resolution;
  const ttl = req.body.ttl;
  if (!resolution) {
    const err = new ApiError('400', 'empty parameters');
    next(err);
  }
  try {
    await addResolution(name, resolution, ttl);
    res.status(200).json({ message: 'successfully added' });
  } catch (err) {
    next(err);
  }
};

export const find = async (req, res, next) => {
  let resolution = '';
  try {
    resolution = await findResolution(req.params.name);
    res.status(200).json({ resolution });
  } catch (err) {
    next(err);
  }
};

export const remove = async (req, res, next) => {
  try {
    await deleteResolution(req.params.name);
    res.status(200).json({ message: 'successfully deleted' });
  } catch (err) {
    next(err);
  }
};
