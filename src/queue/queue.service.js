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

  getCurrentPatient = async (doctor) => {
    if (!doctor.id) {
      const doc = await this.doctorService.getDoctorByUserId(doctor.userId);
      /* eslint-disable no-param-reassign */
      doctor.id = doc.id;
    }

    const currentId = await this.storage.getFirstKey(doctor.id);
    const current = await this.patientService.getPatientById(currentId);

    return current;
  };

  nextPatient = async (doctorUserId) => {
    let nextInQueue = null;
    let nextId = null;

    const doctor = await this.doctorService.getDoctorByUserId(doctorUserId);
    const doctorId = doctor.id;

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
