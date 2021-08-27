import ApiError from '../errors/ApiError.js';

export default class QueueService {
  constructor(storage) {
    this.storage = storage;
  }

  addPatientToQueue = async (patient) => {
    const [name, reason = ''] = patient.split(':');
    await this.storage.add(name, reason);
    return name;
  };

  nextPatient = async (name) => {
    let nextInQueue = null;
    const index = await this.storage.findIndex(name.trim());
    if (index < 0) {
      throw new ApiError(404, `Patient ${name} not found`);
    }
    await this.storage.remove(index);

    const isStorageEmpty = await this.storage.isEmpty();
    if (!isStorageEmpty) {
      nextInQueue = await this.storage.getNameByIndex(index);
    }
    if (nextInQueue === null) {
      throw new ApiError(400, 'No patients in the queue');
    }
    return nextInQueue;
  };

  getCurrentPatient = async () => {
    let current = null;
    const isStorageEmpty = await this.storage.isEmpty();
    if (isStorageEmpty) {
      throw new ApiError(400, 'No patients in the queue');
    }
    current = await this.storage.getFirstKey();
    return current;
  };
}
