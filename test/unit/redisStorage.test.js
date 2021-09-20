import { expect } from 'chai';
import RedisQueue from '../../src/storage/redis/queue.storage.js';
import createClient from './mocks/redis.mock.js';

const redisStorage = new RedisQueue(createClient);
const redisClient = createClient();

describe('Redis storage tests', () => {
  const id = 1;
  const doctorId = 1;
  const queueName = `queue:${doctorId}`;

  describe('[METHOD] add', () => {
    it('should add id for the specified doctor', async () => {
      redisClient.RPUSH.withArgs(queueName, id).resolves(undefined);
      expect(await redisStorage.add(id, doctorId)).to.be.undefined;
      expect(redisClient.RPUSH.calledWith(queueName, `${id}`)).to.be.true;
    });
  });

  describe('[METHOD] getFirstKey', () => {
    it('should return the first patientId of the specific queue', async () => {
      redisClient.LINDEX.withArgs(queueName, 0).resolves(id);
      expect(await redisStorage.getFirstKey(doctorId)).to.be.equal(id);
      expect(redisClient.LINDEX.calledWith(queueName, 0)).to.be.true;
    });
  });

  describe('[METHOD] remove', () => {
    it('should delete first element from queue', async () => {
      redisClient.LPOP.withArgs(queueName).resolves(id);
      expect(await redisStorage.remove(doctorId)).to.be.undefined;
      expect(redisClient.LPOP.calledWith(queueName)).to.be.true;
    });
  });

  describe('[METHOD] reset', () => {
    it('should delete all keys', async () => {
      redisClient.FLUSHALL.resolves(undefined);
      expect(await redisStorage.reset()).to.be.undefined;
      expect(redisClient.FLUSHALL.calledWith()).to.be.true;
    });
  });

  describe('[METHOD] isEmpty', () => {
    it('should return false when queue is not empty', async () => {
      redisClient.LLEN.withArgs(queueName).resolves(1);
      expect(await redisStorage.isEmpty(doctorId)).to.be.false;
      expect(redisClient.LLEN.calledWith(queueName)).to.be.true;
    });
  });
});
