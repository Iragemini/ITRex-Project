import Service from './Service.js';

class ResolutionService extends Service {
  getResolutions = async (name) => {
    const res = await this.getResource(`/resolutions/?patientName=${name}`);
    return res;
  };

  getUserResolutions = async () => {
    const res = await this.getResource('/resolutions/me');
    return res;
  };

  postResolution = async (data) => {
    const res = await this.postResource(`/resolutions`, data);
    return res;
  };

  deleteResolution = async (resolutionId) => {
    const res = await this.patchResource(`/resolutions/${resolutionId}`);
    return res;
  };
}

const resolutionService = new ResolutionService();

export default resolutionService;
