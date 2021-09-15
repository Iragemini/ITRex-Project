import constants from "./constants.js";

const { baseUrl } = constants;

const getIntoQueue = async () => {
  const windowhref = window.location.href;
  const hrefArray = windowhref.split('/')

  const doctorId = hrefArray[hrefArray.length - 1].replace('doctor-', '').replace('#', '');

  const config = {
    method: 'POST',
    url: `${baseUrl}/api/queue/${doctorId}`,
  };

  try {
    const response = await axios(config)
    if (response.status === 201) {
      location.reload();
    }
  } catch (error) {
    console.log(error);
  }
};

export { getIntoQueue };
