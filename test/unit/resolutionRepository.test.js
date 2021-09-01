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
  const dataValues = { id, resolution, expire };
  const data = { resolution: `${resolution} ${resolution}`, expire };

  describe('Add resolution', () => {
    it('should add resolution to database', async () => {
      db.resolution
        .create
        .withArgs({ patient_id: id, resolution, expire: null })
        .resolves(undefined);
      expect(await mysqlResolution.add(id, { resolution, ttl })).to.be.undefined;
      expect(db.resolution.create.calledWith({ patient_id: id, resolution, expire: null }))
        .to.be.true;
    });
  });

  describe('Update resolution', () => {
    it('should add new text to resolution field', async () => {
      db.resolution.findOne.withArgs({ where: { patient_id: id } }).resolves(dataValues);
      db.resolution.update.withArgs(data, { where: { id } }).resolves(undefined);

      expect(await mysqlResolution.update(id, resolution, ttl)).to.be.undefined;
      expect(db.resolution.update.calledWith(data, { where: { id } })).to.be.true;

      sandbox.restore();
    });
  });

  describe('Get resolution', () => {
    it('should return resolution object', async () => {
      db.resolution.findOne.withArgs({ where: { patient_id: id } }).resolves(dataValues);
      expect(await mysqlResolution.getResolution(id))
        .to.be.an('object')
        .with.property('resolution')
        .that.to.equal(resolution);
      expect(db.resolution.findOne.calledWith({ where: { patient_id: id } })).to.be.true;
    });
  });

  describe('Remove resolution', () => {
    it('should delete field in resolutions table by patient id', async () => {
      db.resolution.destroy.withArgs({ where: { patient_id: id } }).resolves(undefined);
      expect(await mysqlResolution.removeResolution(id)).to.be.undefined;
      expect(db.resolution.destroy.calledWith({ where: { patient_id: id } })).to.be.true;
    });
  });

  describe('Get one resolution', () => {
    it('should return patient resolution', async () => {
      db.resolution.findOne.withArgs({ where: { patient_id: id } }).resolves(dataValues);
      expect(await mysqlResolution.getOneResolution(id)).to.deep.include(dataValues);
      expect(db.resolution.findOne.calledWith({ where: { patient_id: id } })).to.be.true;
    });
  });
});
