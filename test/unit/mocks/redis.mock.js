import sinon from 'sinon';

const redisClient = sinon.stub({
  RPUSH: () => {},
  LRANGE: () => {},
  LLEN: () => {},
  LPOP: () => {},
  FLUSHALL: () => {},
  LINDEX: () => {},
  SETEX: () => {},
  GET: () => {},
  DEL: () => {},
});

const createClient = () => redisClient;

export default createClient;
