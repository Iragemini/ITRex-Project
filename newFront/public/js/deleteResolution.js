import constants from "./constants.js";

const { baseUrl } = constants;

export const deleteResolution = async (resolutionId) => {
  const config = {
    method: 'DELETE',
    url: `${baseUrl}/api/resolutions/${resolutionId}`,
  };

  try {
    const response = await axios(config)
    if (response.status === 204) {
      location.reload('');
    }
  } catch (error) {
    console.log(error);
  }
};
