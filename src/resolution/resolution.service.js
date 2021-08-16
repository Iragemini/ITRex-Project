import { patients } from '../storage/index.js';
import { isResolutionExpired } from '../utils/resolution.js';
import { getExpiration } from '../utils/getExpiration.js';
import ApiError from '../errors/ApiError.js';

const storage = await patients.get();

const updateResolution = async (index, name, resolution, expire) => {
  let currentResolution = '';
  await patients.getResolution(index, name).then((result) => {
    currentResolution = result.resolution;
  });
  const newValue = {
    resolution: `${currentResolution} ${resolution}`,
    expire,
  };
  await patients.update(index, name, newValue);
};

export const addResolution = async (name, resolution, ttl = '') => {
  const expire = getExpiration(ttl);
  if (!storage.length) {
    await patients.add(name, { resolution, expire });
    return;
  }
  const index = await patients.find(name);
  if (index !== null) {
    await updateResolution(index, name, resolution, expire);
    return;
  }

  await patients.add(name, { resolution, expire });
};

export const deleteResolution = async (name) => {
  const index = await patients.find(name);
  if (index === null) {
    throw new ApiError(404, 'resolution not found');
  }
  await patients.removeValue(name, index);
};

export const findResolution = async (name) => {
  const message = 'No resolutions';
  const index = await patients.find(name);
  if (index === null) {
    throw new ApiError(404, 'patient not found');
  }
  const { resolution, expire } = await patients.getResolution(index, name);

  if (!isResolutionExpired(expire)) {
    return resolution || message;
  }
  await patients.remove(index);
  return message;
};
