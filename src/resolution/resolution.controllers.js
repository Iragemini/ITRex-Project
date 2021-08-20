import ApiError from '../errors/ApiError.js';
import service from '../service/service.js';

const ResolutionService = service('resolution');

export const add = async (req, res, next) => {
  const { name } = req.params;
  const { resolution, ttl } = req.body;
  if (!resolution) {
    const err = new ApiError(400, 'empty parameters');
    next(err);
  }
  try {
    await ResolutionService.addResolution(name, resolution, ttl);
    res.sendStatus(201);
  } catch (err) {
    next(err);
  }
};

export const find = async (req, res, next) => {
  let resolution = '';
  const { name } = req.params;
  try {
    resolution = await ResolutionService.findResolution(name);
    if (!resolution) {
      resolution = `Resolution for ${name} not found`;
    }
    res.status(200).json({ resolution });
  } catch (err) {
    next(err);
  }
};

export const remove = async (req, res, next) => {
  try {
    await ResolutionService.deleteResolution(req.params.name);
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
};
