export const getExpiration = (ttl) => {
  let expire = '';
  if (ttl) {
    expire = ttl * 1000 + Date.now();
  }
  return expire;
};
