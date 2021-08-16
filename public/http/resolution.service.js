import Service from './Service.js';

class ResolutionService extends Service {
  getResolution = async (name) => {
    const res = await this.getResource(`/resolution/${name}`);
    return res;
  };

  patchResolution = async (name, data) => {
    const res = await this.patchResource(`/resolution/${name}`, data);
    return res;
  };

  deleteResolution = async (name) => {
    const res = await this.patchResource(`/resolution/${name}/delete`);
    return res;
  };
}

const resolutionService = new ResolutionService();

export default resolutionService;
