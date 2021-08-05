export const isExpired = (expire) => {
  if (!expire || Number.parseInt(expire, 10) >= Date.now()) {
    return false;
  }
  return true;
};

export const checkTTL = (ttl) => ttl > 0;
