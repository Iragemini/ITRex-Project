import { expect } from 'chai';
import RedisQueue from '../../src/storage/redis/queue.storage.js';
import createClient from './mocks/redis.mock.js';

const redisStorage = new RedisQueue(createClient);
const redisClient = createClient();

describe('Redis storage tests', () => {
  const id = '1';
  const reason = 'reason';
  const data = [`${id}:${reason}`];

  describe('[METHOD] add', () => {
    it('should add id and reason', async () => {
      redisClient.RPUSH.withArgs('queue', `${id}:${reason}`).resolves(undefined);
      expect(await redisStorage.add(id, reason)).to.be.undefined;
      expect(redisClient.RPUSH.calledWith('queue', `${id}:${reason}`)).to.be.true;
    });
  });

  describe('[METHOD] get', () => {
    it('should return all values for the key', async () => {
      redisClient.LRANGE.withArgs('queue', 0, -1).resolves(data);
      expect(await redisStorage.get()).to.be.equal(data);
      expect(redisClient.LRANGE.calledWith('queue', 0, -1)).to.be.true;
    });
  });

  describe('[METHOD] remove', () => {
    it('should delete first element from queue', async () => {
      redisClient.LPOP.withArgs('queue').resolves(data);
      expect(await redisStorage.remove()).to.be.undefined;
      expect(redisClient.LPOP.calledWith('queue')).to.be.true;
    });
  });

  describe('[METHOD] reset', () => {
    it('should delete all keys', async () => {
      redisClient.FLUSHALL.resolves(undefined);
      expect(await redisStorage.reset()).to.be.undefined;
      expect(redisClient.FLUSHALL.calledWith()).to.be.true;
    });
  });

  describe('[METHOD] getFirstKey', () => {
    it('should return key', async () => {
      redisClient.LRANGE.withArgs('queue', 0, -1).resolves(data);
      expect(await redisStorage.getFirstKey()).to.be.equal(id);
    });
  });

  describe('[METHOD] isEmpty', () => {
    it('should return false when queue is not empty', async () => {
      redisClient.LLEN.withArgs('queue').resolves(1);
      expect(await redisStorage.isEmpty()).to.be.false;
      expect(redisClient.LLEN.calledWith('queue')).to.be.true;
    });
  });
});
