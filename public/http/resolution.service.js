import Service from './Service.js';

class ResolutionService extends Service {
  getResolution = async (name) => {
    const res = await this.getResource(`/resolution/doctor/${name}`);
    return res;
  };

  getUserResolution = async () => {
    const res = await this.getResource('/resolution/patient');
    return res;
  };

  patchResolution = async (name, data) => {
    const res = await this.patchResource(`/resolution/doctor/${name}`, data);
    return res;
  };

  deleteResolution = async (name) => {
    const res = await this.patchResource(`/resolution/doctor/${name}/delete`);
    return res;
  };
}

const resolutionService = new ResolutionService();

export default resolutionService;
