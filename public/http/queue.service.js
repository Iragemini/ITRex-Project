import Service from './Service.js';

class QueueService extends Service {
  getCurrentInQueue = async () => {
    const res = await this.getResource('/queue');
    return res;
  };

  postPatientInQueue = async (data) => {
    const res = await this.postResource('/queue', data);
    return res;
  };

  deletePatientFromQueue = async () => {
    const res = await this.deleteResource('/queue');
    return res;
  };
}

const queueService = new QueueService();

export default queueService;
