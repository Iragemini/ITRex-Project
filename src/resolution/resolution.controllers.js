import resolutionService from './index.js';

export const add = async (req, res, next) => {
  const resolution = await resolutionService.addResolution(req.body, req.user.id); // doctor user id

  res.status(201).json({
    data: resolution,
  });
};

export const findAll = async (req, res, next) => {
  const resolutions = await resolutionService.findAllResolutions(req.query);

  res.status(200).json({
    data: resolutions,
  });
};

export const findAllByUserId = async (req, res, next) => {
  const resolutions = await resolutionService.findResolutionsByUserId(req.user.id);

  res.status(200).json({
    data: resolutions,
  });
};

export const remove = async (req, res, next) => {
  await resolutionService.deleteResolutionById(req.params.resolutionId);

  res.sendStatus(204);
};
