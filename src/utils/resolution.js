const isResolutionExpired = (expiry) => {
  if (!expiry || Number.parseInt(expiry, 10) >= Date.now()) {
    return false;
  }
  return true;
};

export default isResolutionExpired;
