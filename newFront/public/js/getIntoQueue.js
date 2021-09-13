/* eslint-disable */

const getIntoQueue = async () => {
  const test = window.location.href;
  const array = test.split('/')

  const doctorId = array[array.length - 1].replace('doctor-', '').replace('#', '');

  const config = {
    method: 'POST',
    url: `http://127.0.0.1:3000/api/queue/${doctorId}`,
  };

  const res = await axios(config)
    .then(function (response) {
      if (response.status === 201) {
        console.log(response);
        // location.reload(true);
      }
    })
    .catch(function (error) {
      alert(error);
      // showAlert('error', error.response.data.message);
    });
};

export { getIntoQueue };
