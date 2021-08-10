export const isExpired = (expire) => {
  if (!expire || Number.parseInt(expire, 10) >= Date.now()) {
    return false;
  }
  return true;
};

export const checkTTL = (ttl) => {
  const valid = ttl > 0;
  if (!valid) {
    throw new Error('invalid TTL value');
  }
};
