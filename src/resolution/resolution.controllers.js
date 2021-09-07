import resolutionService from './index.js';

export const add = async (req, res, next) => {
  const { name } = req.params;
  const { resolution, ttl } = req.body;
  await resolutionService.addResolution(name, resolution, ttl);
  res.sendStatus(201);
};

export const find = async (req, res, next) => {
  const { name } = req.params;
  let resolution = await resolutionService.findResolution(name);
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

export const getUserResolution = async (req, res, next) => {
  let resolution = await resolutionService.findResolutionByUserId(req.userId);
  if (!resolution) {
    resolution = 'Resolution not found';
  }
  res.status(200).json({ resolution });
};
