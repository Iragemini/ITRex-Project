import sinon from 'sinon';

const patientService = sinon.stub({
  addPatient: () => {},
  getPatientId: () => {},
  getPatientName: () => {},
});

export default patientService;
