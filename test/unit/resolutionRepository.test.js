import { expect } from 'chai';
import sinon from 'sinon';
import MySQLResolution from '../../src/repository/mysql/resolution.js';
import db from './mocks/db.mock.js';

const mysqlResolution = new MySQLResolution(db);
const sandbox = sinon.createSandbox();

describe('Resolution repository tests', () => {
  const id = 1;
  const resolution = 'resolution';
  const ttl = -1;
  const expire = null;
  const dataValues = { dataValues: { id, resolution } };
  const data = { resolution: `${resolution} ${resolution}`, expire };

  describe('Add resolution', () => {
    it('should add resolution to database', async () => {
      db.resolution.create.withArgs({ patient_id: id, resolution, expire: null })
        .resolves(undefined);
      expect(await mysqlResolution.add(id, { resolution, ttl })).to.be.undefined;
    });
  });

  describe('Update resolution', () => {
    it('should add new text to resolution field', async () => {
      sandbox.replace(mysqlResolution, 'getAllResolutions', () => [dataValues]);
      db.resolution.update.withArgs(data, { where: { id } }).resolves(undefined);

      expect(await mysqlResolution.update(id, resolution, ttl)).to.be.undefined;

      sandbox.restore();
    });
  });

  describe('Get resolution', () => {
    it('should return resolution object', async () => {
      db.resolution.findAll.withArgs({ where: { patient_id: id } })
        .resolves([{ id, resolution, expire }]);
      expect(await mysqlResolution.getResolution(id))
        .to.be.an('object')
        .with.property('resolution')
        .that.to.equal(resolution);
    });
  });

  describe('Remove resolution', () => {
    it('should delete field in resolutions table by patient id', async () => {
      db.resolution.destroy.withArgs({ where: { patient_id: id } }).resolves(undefined);
      expect(await mysqlResolution.removeResolution(id)).to.be.undefined;
    });

    it('should remove value in resolution field', async () => {
      sandbox.replace(mysqlResolution, 'getAllResolutions', () => [dataValues]);
      db.resolution.update.withArgs(data, { where: { id } }).resolves(undefined);
      expect(await mysqlResolution.removeValue(id)).to.be.undefined;
      sandbox.restore();
    });
  });

  describe('Get all resolution', () => {
    it('should return all resolutions for patient', async () => {
      db.resolution.findAll.withArgs({ where: { patient_id: id } }).resolves(resolution);
      expect(await mysqlResolution.getAllResolutions(id)).to.be.equal(resolution);
    });
  });
});
