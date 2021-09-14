const isResolutionExpired = (expire) => {
  if (!expire || Number.parseInt(expire, 10) >= Date.now()) {
    return false;
  }
  return true;
};

export default isResolutionExpired;
