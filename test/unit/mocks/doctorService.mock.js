import sinon from 'sinon';

const patientService = sinon.stub({
  getDoctorById: () => {},
  getDoctorByUserId: () => {},
});

export default patientService;
