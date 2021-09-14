import constants from "./constants.js";

const { baseUrl } = constants;

export const deleteResolution = async (resolutionId) => {
  const config = {
    method: 'DELETE',
    url: `${baseUrl}/api/resolutions/${resolutionId}`,
  };

  await axios(config)
    .then(function (response) {
      if (response.status === 204) {
        location.reload('');
      }
    })
    .catch(function (error) {
      console.log(error);
    });
};
