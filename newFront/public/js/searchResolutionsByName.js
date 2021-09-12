/* eslint-disable */

const searchResolutionsByName = name => {
  window.location.href = window.location.pathname + '?patientName=' + name;
};

export default searchResolutionsByName;
