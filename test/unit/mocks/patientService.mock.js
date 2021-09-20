import sinon from 'sinon';

const patientService = sinon.stub({
  addPatient: () => {},
  getPatientById: () => {},
  getPatientByUserId: () => {},
});

export default patientService;
