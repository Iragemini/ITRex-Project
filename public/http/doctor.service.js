import Service from './Service.js';

class DoctorService extends Service {
  getDoctors = async () => {
    const res = await this.getPublicResource('/doctors');
    return res;
  };

  getDoctor = async (doctorId) => {
    const res = await this.getPublicResource(`/doctors/${doctorId}`);
    return res;
  };
}

const doctorService = new DoctorService();

export default doctorService;
