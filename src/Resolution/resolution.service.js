import patients from './resolution.storage.js';
import { isExpired } from '../utils/check.js';
import { getExpiration } from '../utils/getExpiration.js';

const storage = await patients.get();

export const addResolution = async (name, resolution, ttl = '') => {
  const expire = getExpiration(ttl);

  if (storage.length === 0) {
    await patients.add(name, { resolution, expire });
    return;
  }
  const index = await patients.find(name);
  if (index !== null) {
    const currentResolution = storage[index][name].resolution;
    const newValue = {
      resolution: `${currentResolution} ${resolution}`,
      expire,
    };
    await patients.update(index, name, newValue);
    return;
  }

  await patients.add(name, { resolution, expire });
};

export const deleteResolution = async (name) => {
  const index = await patients.find(name);
  if (index === null) {
    throw new Error(404);
  }
  await patients.removeValue(name, index);
};

export const findResolution = async (name) => {
  const message = 'No resolutions';
  const index = await patients.find(name);
  if (index === null) {
    throw new Error(404);
  }
  const { resolution, expire } = await patients.getResolution(index, name);

  if (!isExpired(expire)) {
    return resolution || message;
  }
  await patients.remove(index);
  return message;
};
