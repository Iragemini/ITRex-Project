import ApiError from '../errors/ApiError.js';
import { Service } from '../service/Service.js';
const serviceInstance = new Service('resolution');
const service = serviceInstance.createService();

export const add = async (req, res, next) => {
  const name = req.params.name;
  const resolution = req.body.resolution;
  const ttl = req.body.ttl;
  if (!resolution) {
    const err = new ApiError(400, 'empty parameters');
    next(err);
  }
  try {
    await service.addResolution(name, resolution, ttl);
    res.sendStatus(201);
  } catch (err) {
    next(err);
  }
};

export const find = async (req, res, next) => {
  let resolution = '';
  try {
    resolution = await service.findResolution(req.params.name);
    res.status(200).json({ resolution });
  } catch (err) {
    next(err);
  }
};

export const remove = async (req, res, next) => {
  try {
    await service.deleteResolution(req.params.name);
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
};
