/* eslint-disable */

export const getPatientId = async () => {
  const config = {
    method: 'GET',
    url: 'http://127.0.0.1:3000/api/queue',
  };

  return await axios(config);
};

export const submitResolution = async (patientId, resolution, ttl) => {
  const config = {
    method: 'POST',
    url: 'http://127.0.0.1:3000/api/resolutions',
    data: {
      patientId,
      resolution,
      ttl,
    },
  };

  const res = await axios(config)
    .then(function (response) {
      if (response.status === 200) {
        // console.log(response);
      }
    })
    .catch(function (error) {
      alert(error);
    });
};

export const dequeue = async () => {
  const config = {
    method: 'DELETE',
    url: 'http://127.0.0.1:3000/api/queue',
  };

  const res = await axios(config)
    .then(function (response) {
      // if (response.data.statusCode === 404) {
      //   alert('test');
      // }
    })
    .catch(function (error) {
      alert(error);
      // showAlert('error', error.response.data.message);
    });

  return res;
};
