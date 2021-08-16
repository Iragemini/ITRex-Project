import queueService from '../http/queue.service.js';
import setCurrentPatient from './utils/setCurrentPatient.js';

window.onload = async () => {
  try {
    const { current } = await queueService.getCurrentInQueue();
    setCurrentPatient(current, '');
  } catch (err) {
    console.log(err.text);
  }
};
