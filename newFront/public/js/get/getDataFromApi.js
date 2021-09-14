import constants from "../constants.js";

const { baseUrl } = constants;

const allAvailableDoctors = async () => {
  const config = {
    method: 'GET',
    url: `${baseUrl}/api/doctors`,
  };

  try {
    return await axios(config)
  } catch (error) {
    console.log(error);
  }
};

const doctorById = async (id) => {
  const config = {
    method: 'GET',
    url: `${baseUrl}/api/doctors/${id}`,
  };

  try {
    return await axios(config)
  } catch (error) {
    alert(error);
  }
};

const doctorByUserId = async () => {
  const config = {
    method: 'GET',
    url: `${baseUrl}/api/doctors/me`,
  };

  try {
    return await axios(config)
  } catch (error) {
    alert(error);
  }
}

const patientFromQueue = async (doctorId) => {
  const config = {
    method: 'GET',
    url: `${baseUrl}/api/queue/${doctorId}`,
  };

  try {
    return await axios(config)
  } catch (error) {
    console.log(error);
  }
};

const personalUserProfile = async () => {
  const config = {
    method: 'GET',
    url: `${baseUrl}/api/users/me`,
  };

  try {
    return await axios(config)
  } catch (error) {
    throw 'not signed in';
  }
}

const personalResolutions = async () => {
  const config = {
    method: 'GET',
    url: `${baseUrl}/api/resolutions/me`,
  };

  try {
    return await axios(config)
  } catch (error) {
    console.log(error);
  }
}

const resolutionsByName = async (name) => {
  const config = {
    method: 'GET',
    url: `${baseUrl}/api/resolutions?patientName=${name}`,
  };

  try {
    return await axios(config)
  } catch (error) {
    console.log(error);
  }
}

export default { allAvailableDoctors, doctorById, patientFromQueue, personalUserProfile, doctorByUserId, personalResolutions, resolutionsByName };
