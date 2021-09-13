export const deleteResolution = async (resolutionId) => {
  const config = {
    method: 'DELETE',
    url: `http://127.0.0.1:3000/api/resolutions/${resolutionId}`,
  };

  const res = await axios(config)
    .then(function (response) {
      if (response.status === 204) {
        location.reload(true);
      }
    })
    .catch(function (error) {
      alert(error);
    });
};