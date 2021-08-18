const config = {};

config.server = {
  port: process.env.PORT || 3000,
};

/* type - parameter, described in ./storage.js */
config.storage = {
  type: 1,
};

config.ttl = '';

export default config;
