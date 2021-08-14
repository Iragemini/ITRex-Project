import service from './services/index.js';
import setCurrentPatient from './utils/setCurrentPatient.js';

window.onload = () => {
  service
    .getCurrentInQueue()
    .then((result) => {
      setCurrentPatient(result.current, '');
    })
    .catch((err) => {
      console.log(err.text);
    });
};
