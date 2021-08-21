import ResolutionService from './resolution.service.js';
import factory from '../storage/StorageManager.js';

const storage = factory.createStorage('resolution');
const resolutionService = new ResolutionService(storage);

export const add = async (req, res, next) => {
  const { name } = req.params;
  const { resolution, ttl } = req.body;
  await resolutionService.addResolution(name, resolution, ttl);
  res.sendStatus(201);
};

export const find = async (req, res, next) => {
  let resolution = '';
  const { name } = req.params;
  resolution = await resolutionService.findResolution(name);
  if (!resolution) {
    resolution = `Resolution for ${name} not found`;
  }
  res.status(200).json({ resolution });
};

export const remove = async (req, res, next) => {
  const { name } = req.params;
  await resolutionService.deleteResolution(name);
  res.sendStatus(200);
};
