import ApiError from '../errors/ApiError.js';

export default class QueueService {
  constructor(storage, patientService, doctorService) {
    this.storage = storage;
    this.patientService = patientService;
    this.doctorService = doctorService;
  }

  addPatientToQueue = async (userId, doctorId) => {
    await this.doctorService.getDoctorById(doctorId); // to check if the doctor exists

    const patient = await this.patientService.getPatientByUserId(userId);

    await this.storage.add(patient.id, doctorId);
  };

  getCurrentPatient = async (doctorId) => {
    const currentId = await this.storage.getFirstKey(doctorId);
    const current = await this.patientService.getPatientById(currentId);

    return current;
  };

  nextPatient = async (doctorId) => {
    let nextInQueue = null;
    let nextId = null;

    await this.storage.remove(doctorId);

    const isStorageEmpty = await this.storage.isEmpty(doctorId);

    if (!isStorageEmpty) {
      nextId = await this.storage.getFirstKey(doctorId);
      nextInQueue = await this.patientService.getPatientById(nextId);
    } else {
      throw new ApiError(404, 'No patients in the queue');
    }

    return nextInQueue;
  };
}
