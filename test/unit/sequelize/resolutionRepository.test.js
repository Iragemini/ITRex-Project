import { expect } from 'chai';
import MySQLResolution from '../../../src/repository/mysql/resolution.js';
import db from '../mocks/db.mock.js';

const mysqlResolution = new MySQLResolution(db);

describe('Resolution repository tests', () => {
  const id = 1;
  const resolution = 'resolution';
  const ttl = -1;
  const expire = null;
  const patientId = 5;
  const doctorName = 'test';
  const doctorSpecialization = 'test';

  const data = {
    patientId,
    resolution,
    ttl,
    doctorName,
    doctorSpecialization,
  };

  const outputValues = {
    id,
    patientId,
    resolution,
    expire,
    doctorName,
    doctorSpecialization,
  };

  const patientName = 'test';
  const userId = 5;

  describe('Add resolution', () => {
    it('should add resolution to database', async () => {
      db.resolution.create.resolves(outputValues);

      expect(await mysqlResolution.add(data)).to.deep.equal(outputValues);
    });
  });

  describe('Get all resolutions with optional name query', () => {
    it('should return resolutions list without optional query', async () => {
      db.resolution.findAll.resolves([{ outputValues }]);

      expect(await mysqlResolution.getAllResolutions({}))
        .to.be.deep.equal([{ outputValues }]);
      expect(db.resolution.findAll.calledOnce).to.be.true;
    });

    it('should return resolutions list with optional query', async () => {
      db.sequelize.query.resolves([{ outputValues }]);

      expect(await mysqlResolution.getAllResolutions({ patientName }))
        .to.be.deep.equal([{ outputValues }]);
      expect(db.sequelize.query.calledOnce).to.be.true;
    });
  });

  describe('Get resolution by user Id', () => {
    it('should return resolutions list with optional query', async () => {
      db.sequelize.query.resolves([{ outputValues }]);

      expect(await mysqlResolution.getResolutionsByUserId(userId))
        .to.be.deep.equal([{ outputValues }]);
    });
  });

  describe('Remove resolution', () => {
    it('should delete resolution by id', async () => {
      db.resolution.destroy.withArgs({ where: { id } }).resolves(1);
      expect(await mysqlResolution.removeResolution(id)).to.equal(1);
      expect(db.resolution.destroy.calledWith({ where: { id } })).to.be.true;
    });
  });
});
