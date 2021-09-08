import ApiError from '../errors/ApiError.js';

export default class QueueService {
  constructor(storage, patientService) {
    this.storage = storage;
    this.patientService = patientService;
  }

  addPatientToQueue = async (data) => {
    const { userId, reason } = data;
    const id = await this.patientService.getPatientIdByUserId(userId);
    await this.storage.add(id, reason);
  };

  nextPatient = async () => {
    let nextInQueue = null;
    let nextId = null;

    await this.storage.remove();

    const isStorageEmpty = await this.storage.isEmpty();
    if (!isStorageEmpty) {
      nextId = await this.storage.getFirstKey();
      nextInQueue = await this.patientService.getPatientName(nextId);
    } else {
      throw new ApiError(400, 'No patients in the queue');
    }
    return nextInQueue;
  };

  getCurrentPatient = async () => {
    let current = null;
    let currentId = null;
    const isStorageEmpty = await this.storage.isEmpty();
    if (isStorageEmpty) {
      throw new ApiError(400, 'No patients in the queue');
    }
    currentId = await this.storage.getFirstKey();
    current = await this.patientService.getPatientName(currentId);
    return current.name;
  };
}
