export const getExpiration = (ttl) => {
  let expire = null;
  if (ttl > 0) {
    expire = ttl * 1000 + Date.now();
  }
  return expire;
};
