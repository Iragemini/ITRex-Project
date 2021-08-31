import { expect } from 'chai';
import createClient from './mocks/redis.mock.js';
import factory from '../../src/storage/factory.js';

const redisStorage = factory.createStorage(createClient);
const redisClient = createClient();

describe('Redis storage tests', () => {
  const id = '1';
  const reason = 'reason';
  const data = [`${id}:${reason}`];

  describe('[METHOD] add', () => {
    it('should add id and reason', async () => {
      redisClient.RPUSH.withArgs('queue', `${id}:${reason}`).resolves(undefined);
      expect(await redisStorage.add(id, reason)).to.be.undefined;
    });
  });

  describe('[METHOD] get', () => {
    it('should add new text to resolution field', async () => {
      redisClient.LRANGE.withArgs('queue', 0, -1).resolves(data);
      expect(await redisStorage.get()).to.be.equal(data);
    });
  });

  describe('[METHOD] remove', () => {
    it('should delete first element from queue', async () => {
      redisClient.LPOP.withArgs('queue').resolves(data);
      expect(await redisStorage.remove()).to.be.undefined;
    });
  });

  describe('[METHOD] reset', () => {
    it('should delete all keys', async () => {
      redisClient.FLUSHALL.resolves(undefined);
      expect(await redisStorage.reset()).to.be.undefined;
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
    });
  });
});
