import { expect } from 'chai';
import sinon from 'sinon';
import patientService from './mocks/patientService.mock.js';
import doctorService from './mocks/doctorService.mock.js';
import MySQLResolution from '../../src/repository/mysql/resolution.js';
import PGResolution from '../../src/repository/postgres/resolution.js';
import ResolutionService from '../../src/resolution/resolution.service.js';
import db, { pool } from './mocks/db.mock.js';
import config from '../../config/config.js';
import constants from '../../src/utils/constants.js';

const {
  db: { dbType },
} = config;

const repository = dbType === constants.repositoryTypes.mysql
  ? new MySQLResolution(db)
  : new PGResolution(pool);

const resolutionService = new ResolutionService(repository, patientService, doctorService);

const sandbox = sinon.createSandbox();

describe('Resolution tests', () => {
  const patientId = 111;
  const doctorId = 1;
  const resolution = 'resolution';
  const ttl = undefined;

  const doctorUserId = 1;

  const doctor = {
    name: 'Doctor_1',
    id: doctorId,
    specialization: 'dermatologist',
  };

  const body = {
    patientId,
    resolution,
    ttl,
  };

  const resolutionData = {
    patient_id: patientId,
    doctor_id: doctorId,
    resolution,
    expire: null,
  };

  afterEach(() => {
    sandbox.restore();
  });

  describe('Add resolution', () => {
    it('should add resolution', async () => {
      sandbox.replace(repository, 'add', () => resolutionData);
      const spyAdd = sandbox.spy(repository, 'add');

      doctorService.getDoctorByUserId.resolves(doctor);

      expect(await resolutionService.addResolution(body, doctorUserId))
        .to.deep.equal(resolutionData);
      expect(spyAdd.calledOnce).to.be.true;
      expect(spyAdd.calledWith(sinon.match.object)).to.be.true;
    });
  });

  describe('Find all resolutions with optional name query', () => {
    const patientName = 'Patient_999';

    const query = {
      patientName,
    };

    it('should return an empty list when no resolutions/they have expired', async () => {
      sandbox.replace(repository, 'getAllResolutions', () => []);

      const spyGetAllResolutions = sandbox.spy(repository, 'getAllResolutions');

      expect(await resolutionService.findAllResolutions(query))
        .to.deep.equal([]);
      expect(spyGetAllResolutions.withArgs(query).calledOnce).to.be.true;
    });

    it('should return resolutions', async () => {
      sandbox.replace(repository, 'getAllResolutions', () => [{ resolutionData }]);

      const spyGetAllResolutions = sandbox.spy(repository, 'getAllResolutions');

      expect(await resolutionService.findAllResolutions(query))
        .to.deep.equal([{ resolutionData }]);
      expect(spyGetAllResolutions.calledOnce).to.be.true;
      expect(spyGetAllResolutions.calledWith(query)).to.be.true;
    });
  });

  describe('Find all resolutions by user id', () => {
    const userId = 777;

    it('should return an empty list when no resolutions/they have expired', async () => {
      sandbox.replace(repository, 'getResolutionsByUserId', () => []);

      const spyGetResolutionsByUserId = sandbox.spy(repository, 'getResolutionsByUserId');

      expect(await resolutionService.findResolutionsByUserId(userId))
        .to.deep.equal([]);
      expect(spyGetResolutionsByUserId.calledOnce).to.be.true;
      expect(spyGetResolutionsByUserId.withArgs(userId).calledOnce).to.be.true;
    });

    it('should return resolutions', async () => {
      sandbox.replace(repository, 'getResolutionsByUserId', () => [resolutionData]);

      const spyGetResolutionsByUserId = sandbox.spy(repository, 'getResolutionsByUserId');

      expect(await resolutionService.findResolutionsByUserId(userId))
        .to.deep.equal([resolutionData]);
      expect(spyGetResolutionsByUserId.calledOnce).to.be.true;
      expect(spyGetResolutionsByUserId.calledWith(userId)).to.be.true;
    });
  });

  describe('Delete resolution', () => {
    const resolutionId = 1;

    it('should throw an error when there is no resolution', async () => {
      sandbox.replace(repository, 'removeResolution', () => []);

      try {
        await resolutionService.deleteResolutionById(resolutionId);
      } catch (err) {
        expect(err.message).to.equal('Resolution not found');
      }
    });

    it('should delete resolution', async () => {
      sandbox.replace(repository, 'removeResolution', () => [resolutionData]);

      const spyRemoveResolution = sandbox.spy(repository, 'removeResolution');

      expect(await resolutionService.deleteResolutionById(resolutionId))
        .to.deep.equal([resolutionData]);
      expect(spyRemoveResolution.withArgs(resolutionId).calledOnce).to.be.true;
    });
  });
});
