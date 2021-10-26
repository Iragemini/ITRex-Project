import { expect } from 'chai';
import PGDoctor from '../../../src/repository/postgres/doctor.js';
import { pool } from '../mocks/db.mock.js';

const pgDoctor = new PGDoctor(pool);

describe('Doctor repository tests', () => {
  const name = 'Doctor_1';
  const id = 1;
  const userId = 1;
  const title = 'specialization';
  const doctor = {
    id,
    user_id: userId,
    name,
    title,
  };

  const expectedDoctor = {
    id,
    userId,
    name,
    specialization: title,
  };

  afterEach(() => {
    pool.query.resetHistory();
  });

  describe('Get all doctors', () => {
    it('should return doctor list', async () => {
      pool.query.resolves({ rows: [doctor] });

      expect(await pgDoctor.getAll()).to.deep.equal([expectedDoctor]);
      expect(pool.query.calledOnce).to.be.true;
    });

    it('should return empty list', async () => {
      pool.query.resolves({ rows: [] });

      expect(await pgDoctor.getAll()).to.deep.equal([]);
      expect(pool.query.calledOnce).to.be.true;
    });
  });

  describe('Get doctor by id', () => {
    it('should return doctor', async () => {
      pool.query.resolves({ rows: [doctor] });

      expect(await pgDoctor.getById(id)).to.deep.equal(expectedDoctor);
      expect(pool.query.calledOnce).to.be.true;
    });

    it('should return null ', async () => {
      pool.query.resolves({ rows: [] });

      expect(await pgDoctor.getById(id)).to.be.null;
      expect(pool.query.calledOnce).to.be.true;
    });
  });

  describe('Get doctor by user id', () => {
    it('should return doctor', async () => {
      pool.query.resolves({ rows: [doctor] });

      expect(await pgDoctor.getByUserId(userId)).to.deep.equal(expectedDoctor);
      expect(pool.query.calledOnce).to.be.true;
    });

    it('should return null', async () => {
      pool.query.resolves({ rows: [] });

      expect(await pgDoctor.getByUserId(userId)).to.be.null;
      expect(pool.query.calledOnce).to.be.true;
    });
  });
});
