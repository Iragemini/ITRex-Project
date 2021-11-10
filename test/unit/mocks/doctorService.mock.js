import sinon from 'sinon';

const doctorService = sinon.stub({
  getDoctorById: () => {},
  getDoctorByUserId: () => {},
  createDoctor: () => {},
});

export default doctorService;
