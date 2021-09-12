import resolutionService from './index.js';
import doctorService from '../doctor/index.js';
import ApiError from '../errors/ApiError.js';

export const createResolution = async (req, res, next) => {
  const doctor = await doctorService.getDoctorByUserId(req.user.id);
  const newResolution = await resolutionService.addResolution(req.body, doctor);

  res.status(201).json({
    data: newResolution,
  });
};

export const getAllResolutions = async (req, res, next) => {
  const resolutions = await resolutionService.getAllResolutions(req.query);

  if (resolutions.length === 0) {
    return next(new ApiError(404, 'No resolutions found'));
  }

  res.status(200).json({
    data: resolutions,
  });
};

export const getResolutionsByUserId = async (req, res, next) => {
  const resolutions = await resolutionService.getResolutionsByUserId(req.user.id);

  if (resolutions.length === 0) {
    return next(new ApiError(404, 'No resolutions found'));
  }

  res.status(200).json({
    data: resolutions,
  });
};

export const deleteResolutionById = async (req, res, next) => {
  const resolution = await resolutionService.deleteResolutionById(req.params.resolutionId);

  if (resolution === 0) { // sequelize-specific case, it returns 0 if no rows were destroyed
    return next(new ApiError(404, 'Resolution not found'));
  }

  res.sendStatus(204);
};
