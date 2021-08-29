import sinon from 'sinon';

const redisClient = sinon.stub({
  RPUSH: () => {},
  LRANGE: () => {},
  LLEN: () => {},
  LPOP: () => {},
  FLUSHALL: () => {},
});

const createClient = () => redisClient;

export default createClient;
