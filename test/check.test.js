import { expect } from 'chai';
import { checkTTL, isExpired } from '../public/src/utils/check.js';

describe('Check values tests', () => {
  describe('Check TTL', () => {
    const data = [
      {
        value: Date.now(),
        expected: true,
      },
      {
        value: Date.now() * 2,
        expected: false,
      },
      {
        value: Date.now() - 10,
        expected: true,
      },
    ];
    it('should return true when is expired', () => {
      data.forEach((item) => {
        expect(isExpired(item.value)).to.equal(item.expected);
      });
    });
  });

  describe('Check TTL', () => {
    it('should return true when value is a number', () => {
      expect(checkTTL(2)).to.be.true;
      expect(checkTTL('string')).to.be.false;
      expect(checkTTL(null)).to.be.false;
      expect(checkTTL('')).to.be.false;
    });
  });
});
