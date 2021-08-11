export const isExpired = (expire) => {
  if (!expire || Number.parseInt(expire, 10) >= Date.now()) {
    return false;
  }
  return true;
};
