import { expect } from 'chai';
import PGDoctor from '../../../src/repository/postgres/doctor.js';
import { pool } from '../mocks/db.mock.js';

const pgDoctor = new PGDoctor(pool);

describe('Doctor repository tests', () => {
  const name = 'Doctor_1';
  const id = 1;
  const userId = 1;
  const title = 'specialization';
  const specializationId = 1;
  const doctor = {
    id,
    user_id: userId,
    name,
    title,
    specialization_id: specializationId,
  };

  const expectedDoctor = {
    id,
    userId,
    name,
    specialization: title,
    specializationId,
  };

  afterEach(() => {
    pool.query.resetHistory();
  });

  describe('Get all doctors', () => {
    it('should return doctor list', async () => {
      pool.query.resetHistory();
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

  describe('Create doctor', () => {
    it('should create doctor', async () => {
      const newDoctor = {
        id,
        user_id: userId,
        name,
        specialization_id: specializationId,
      };
      pool.query.resolves({ rows: [newDoctor] });

      expect(await pgDoctor.createDoctor({
        userId,
        specializationId,
        name,
      })).to.deep.equal(newDoctor);
      expect(pool.query.calledOnce).to.be.true;
    });
  });

  describe('Delete doctor', () => {
    it('should delete doctor', async () => {
      const deletedDoctor = {
        id,
        user_id: userId,
        name,
        specialization_id: specializationId,
      };
      pool.query.resolves({ rows: [deletedDoctor] });

      expect(await pgDoctor.deleteDoctor(id)).to.deep.equal([deletedDoctor]);
      expect(pool.query.calledOnce).to.be.true;
    });
  });

  describe('Update doctor', () => {
    it('should update doctor specialization', async () => {
      const newSpecialization = 2;
      const updatedDoctor = {
        id,
        user_id: userId,
        name,
        specialization_id: newSpecialization,
      };
      pool.query.resolves({ rows: [updatedDoctor] });

      expect(await pgDoctor.updateDoctor({ specializationId: newSpecialization, name: null, id }))
        .to.deep.equal(updatedDoctor);
      expect(pool.query.calledOnce).to.be.true;
    });

    it('should update doctor name', async () => {
      const newName = 'Doctor_new';
      const updatedDoctor = {
        id,
        user_id: userId,
        name: newName,
        specialization_id: specializationId,
      };
      pool.query.resolves({ rows: [updatedDoctor] });

      expect(await pgDoctor.updateDoctor({ specializationId: null, name: newName, id }))
        .to.deep.equal(updatedDoctor);
      expect(pool.query.calledOnce).to.be.true;
    });

    it('should update doctor name && specialization', async () => {
      const newName = 'Doctor_new';
      const newSpecialization = 2;
      const updatedDoctor = {
        id,
        user_id: userId,
        name: newName,
        specialization_id: newSpecialization,
      };
      pool.query.resolves({ rows: [updatedDoctor] });

      expect(await pgDoctor.updateDoctor({
        specializationId: newSpecialization,
        name: newName,
        id,
      }))
        .to.deep.equal(updatedDoctor);
      expect(pool.query.calledOnce).to.be.true;
    });
  });
});
