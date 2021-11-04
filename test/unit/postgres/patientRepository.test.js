import { expect } from 'chai';
import PGPatient from '../../../src/repository/postgres/patient.js';
import { pool } from '../mocks/db.mock.js';

const pgPatient = new PGPatient(pool);

describe('Patient repository tests', () => {
  const name = 'Patient_1';
  const gender = 'male';
  const birthDate = new Date();
  const id = 1;
  const userId = 777;
  const user = {
    userId,
    name,
    gender,
    birthDate,
  };

  afterEach(() => {
    pool.query.resetHistory();
  });

  describe('Create patient', () => {
    it('should return patient', async () => {
      pool.query.resolves({ rows: [{ id, ...user }] });
      expect(await pgPatient.createPatient(user)).to.deep.equal({
        id,
        ...user,
      });
      expect(pool.query.calledOnce).to.be.true;
    });
  });

  describe('Get patient by id', () => {
    const text = 'SELECT * FROM patients WHERE id=$1';
    const values = [id];

    it('should return patient', async () => {
      pool.query.resolves({ rows: [{ id, ...user }] });

      expect(await pgPatient.getPatientById(id)).to.deep.equal({ id, ...user });
      expect(pool.query.calledWith(text, values)).to.be.true;
      expect(pool.query.calledOnce).to.be.true;
    });

    it('should return null when there is no such patient', async () => {
      pool.query.withArgs(text, values).resolves({ rows: [] });

      expect(await pgPatient.getPatientById(id)).to.be.null;
      expect(pool.query.calledWith(text, values)).to.be.true;
      expect(pool.query.calledOnce).to.be.true;
    });
  });

  describe('Get patient by user id', () => {
    const text = 'SELECT * FROM patients WHERE user_id=$1';
    const values = [userId];

    it('should return patient', async () => {
      pool.query.withArgs(text, values).resolves({ rows: [{ id, ...user }] });

      expect(await pgPatient.getPatientByUserId(userId)).to.deep.equal({
        id,
        ...user,
      });
      expect(pool.query.calledWith(text, values)).to.be.true;
      expect(pool.query.calledOnce).to.be.true;
    });

    it('should return null when there is no such patient', async () => {
      pool.query.withArgs(text, values).resolves({ rows: [] });

      expect(await pgPatient.getPatientByUserId(userId)).to.be.null;
      expect(pool.query.calledWith(text, values)).to.be.true;
      expect(pool.query.calledOnce).to.be.true;
    });
  });
});
