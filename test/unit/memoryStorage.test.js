import { expect } from 'chai';
import MemoryQueue from '../../src/storage/inMemory/queue.storage.js';

const memoryStorage = new MemoryQueue([]);

describe('Memory storage tests', () => {
  const id = '1';
  const reason = 'reason';
  const data = { [id]: reason };

  beforeEach(async () => {
    memoryStorage.reset();
    await memoryStorage.add(id, reason);
  });

  describe('[METHOD] add', () => {
    it('should add id and reason', async () => {
      expect(await memoryStorage.get())
        .to.be.an('array')
        .with.length(1);
    });
  });

  describe('[METHOD] get', () => {
    it('should return array with all patients', async () => {
      expect(await memoryStorage.get())
        .to.be.an('array')
        .with.length(1)
        .to.deep.include(data);
    });
  });

  describe('[METHOD] remove', () => {
    it('should delete first element from queue', async () => {
      await memoryStorage.remove(id);
      expect(await memoryStorage.get())
        .to.be.an('array')
        .with.length(0);
    });
  });

  describe('[METHOD] reset', () => {
    it('should delete all keys', async () => {
      await memoryStorage.reset();
      expect(await memoryStorage.get())
        .to.be.an('array')
        .with.length(0);
    });
  });

  describe('[METHOD] getFirstKey', () => {
    it('should return key', async () => {
      expect(await memoryStorage.getFirstKey()).to.be.equal(id);
    });
  });

  describe('[METHOD] isEmpty', () => {
    it('should return false when queue is not empty', async () => {
      expect(await memoryStorage.isEmpty()).to.be.false;
    });
  });
});
