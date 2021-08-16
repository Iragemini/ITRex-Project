import service from './services/index.js';
import setCurrentPatient from './utils/setCurrentPatient.js';

window.onload = async () => {
  try {
    const { current } = await service.getCurrentInQueue();
    setCurrentPatient(current, '');
  } catch (err) {
    console.log(err.text);
  }
};
