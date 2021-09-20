import constants from "./constants.js";

const { baseUrl } = constants;

export const getPatientId = async () => {
  const config = {
    method: 'GET',
    url: `${baseUrl}/api/queue`,
  };

  try {
    return await axios(config)
  } catch (error) {
    console.log(error);
  }
};

export const submitResolution = async (patientId, resolution, ttl) => {
  const config = {
    method: 'POST',
    url: `${baseUrl}/api/resolutions`,
    data: {
      patientId,
      resolution,
      ttl,
    },
  };

  try {
    const response = await axios(config)
    if (response.status === 201) {
      alert('Resolution submitted.')
    }
  } catch (error) {
    console.log(error);
  }
};

export const dequeue = async () => {
  const config = {
    method: 'DELETE',
    url: `${baseUrl}/api/queue`,
  };

  try {
    await axios(config)
  } catch (error) {
    console.log(error);
  }
};
