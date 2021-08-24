import ApiError from '../errors/ApiError.js';

export default class QueueService {
  constructor(storage, patientService) {
    this.storage = storage;
    this.patientService = patientService;
  }

  addPatientToQueue = async (patient) => {
    const [name, reason = ''] = patient.split(':');
    const id = await this.patientService.addPatient({ name, reason });
    console.log('addPatientToQueue id', id);
    await this.storage.add(id, reason);
    console.log('storage queue', this.storage.get());
    return name;
  };

  nextPatient = async (name) => {
    let nextInQueue = null;
    let nextId = null;
    const patientId = await this.patientService.getPatientId(name.trim());

    await this.storage.remove(patientId);

    const isStorageEmpty = await this.storage.isEmpty();
    console.log('isStorageEmpty', isStorageEmpty);
    if (!isStorageEmpty) {
      nextId = await this.storage.getFirstKey();
      console.log('nextId', nextId);
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
    return current;
  };
}
