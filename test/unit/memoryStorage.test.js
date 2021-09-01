import { expect } from 'chai';
import MemoryQueue from '../../src/storage/inMemory/queue.storage.js';

const memoryStorage = new MemoryQueue([]);

describe('Memory storage tests', () => {
  const id = '1';
  const reason = 'reason';
  const data = { [id]: reason };

  beforeEach(async () => {
    memoryStorage.storage.length = 0;
  });

  describe('[METHOD] add', () => {
    it('should add id and reason', async () => {
      await memoryStorage.add(id, reason);
      expect(memoryStorage.storage.length).to.be.equal(1);
    });
  });

  describe('[METHOD] get', () => {
    it('should return array with all patients', async () => {
      memoryStorage.storage = [data];
      expect(await memoryStorage.get())
        .to.be.an('array')
        .with.length(1)
        .to.deep.include(data);
    });
  });

  describe('[METHOD] remove', () => {
    it('should delete first element from queue', async () => {
      memoryStorage.storage = [data];
      await memoryStorage.remove();
      expect(memoryStorage.storage).to.be.an('array').with.length(0);
    });

    it('should pass when storage is empty', async () => {
      memoryStorage.storage.length = 0;
      await memoryStorage.remove();
      expect(memoryStorage.storage).to.be.an('array').with.length(0);
    });
  });

  describe('[METHOD] reset', () => {
    it('should delete all keys', async () => {
      memoryStorage.storage = [data];
      await memoryStorage.reset();
      expect(await memoryStorage.storage.length).to.be.equal(0);
    });
  });

  describe('[METHOD] getFirstKey', () => {
    it('should return key', async () => {
      memoryStorage.storage = [data];
      expect(await memoryStorage.getFirstKey()).to.be.equal(id);
    });

    it('should pass when storage is empty', async () => {
      memoryStorage.storage.length = 0;
      expect(await memoryStorage.getFirstKey()).to.be.null;
    });
  });

  describe('[METHOD] isEmpty', () => {
    it('should return false when queue is not empty', async () => {
      memoryStorage.storage = [data];
      expect(await memoryStorage.isEmpty()).to.be.false;
    });

    it('should return true when queue is empty', async () => {
      memoryStorage.storage.length = 0;
      expect(await memoryStorage.isEmpty()).to.be.true;
    });
  });
});
