export const isExpired = (expire) => {
  if (!expire || (expire && Number.parseInt(expire, 10) >= Date.now())) {
    return false;
  }
  return true;
};

export const checkTTL = (ttl) => {
  if (!ttl || !Number.parseInt(ttl, 10) || ttl < 0) {
    return false;
  }
  return true;
};
