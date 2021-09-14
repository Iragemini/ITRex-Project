import { expect } from 'chai';
import sinon from 'sinon';
import patientService from './mocks/patientService.mock.js';
import doctorService from './mocks/doctorService.mock.js';
import db from './mocks/db.mock.js';
import MySQLResolution from '../../src/repository/mysql/resolution.js';
import ResolutionService from '../../src/resolution/resolution.service.js';

const mysqlResolution = new MySQLResolution(db);
const resolutionService = new ResolutionService(mysqlResolution, patientService, doctorService);

const sandbox = sinon.createSandbox();

describe('Resolution tests', () => {
  const patientId = 1;
  const resolution = 'resolution';
  const ttl = 5000;

  const doctorUserId = 1;

  const doctor = {
    name: 'Lyolik',
    ['specializations.title']: 'dermatologist', // eslint-disable-line 
  };

  // disabled above because the property is being created via sequelize many-to-many associations

  const body = {
    patientId,
    resolution,
    ttl,
  };

  const data = {
    doctorName: doctor.name,
    doctorSpecialization: doctor['specializations.title'],
    ...body,
  };

  describe('Add resolution', () => {
    afterEach(() => {
      sandbox.restore();
    });

    it('should add resolution based on the info', async () => {
      sandbox.replace(doctorService, 'getDoctorByUserId', () => doctor);
      const spyAdd = sandbox.spy(mysqlResolution, 'add');
      const spyGetDoctor = sandbox.spy(doctorService, 'getDoctorByUserId');

      await resolutionService.addResolution(body, doctorUserId);
      expect(spyGetDoctor.withArgs(doctorUserId).calledOnce).to.be.true;
      expect(spyAdd.withArgs(data).calledOnce).to.be.true;
    });
  });

  describe('Find all resolutions with optional name query', () => {
    const patientName = 'Patient_999';

    afterEach(() => {
      sandbox.restore();
    });

    it('should throw an error when there are no resolutions/they have expired', async () => {
      sandbox.replace(mysqlResolution, 'getAllResolutions', () => []);

      const spyGetAllResolutions = sandbox.spy(mysqlResolution, 'getAllResolutions');

      try {
        await resolutionService.findAllResolutions(patientName);
      } catch (err) {
        expect(spyGetAllResolutions.withArgs(patientName).calledOnce).to.be.true;
        expect(err.message).to.equal('No resolutions found');
      }
    });

    it('should return resolutions', async () => {
      sandbox.replace(mysqlResolution, 'getAllResolutions', () => [resolution]);

      const spyGetAllResolutions = sandbox.spy(mysqlResolution, 'getAllResolutions');

      expect(await resolutionService.findAllResolutions(patientName)).to.deep.equal([resolution]);
      expect(spyGetAllResolutions.calledOnce).to.be.true;
      expect(spyGetAllResolutions.calledWith(patientName)).to.be.true;
    });
  });

  describe('Find all resolutions by user id', () => {
    const userId = 777;

    afterEach(() => {
      sandbox.restore();
    });

    it('should throw an error when there are no resolutions/they have expired', async () => {
      sandbox.replace(mysqlResolution, 'getResolutionsByUserId', () => []);

      const spyGetResolutionsByUserId = sandbox.spy(mysqlResolution, 'getResolutionsByUserId');

      try {
        await resolutionService.findResolutionsByUserId(userId);
      } catch (err) {
        expect(spyGetResolutionsByUserId.withArgs(userId).calledOnce).to.be.true;
        expect(err.message).to.equal('No resolutions found');
      }
    });

    it('should return resolutions', async () => {
      sandbox.replace(mysqlResolution, 'getResolutionsByUserId', () => [resolution]);

      const spyGetResolutionsByUserId = sandbox.spy(mysqlResolution, 'getResolutionsByUserId');

      expect(await resolutionService.findResolutionsByUserId(userId)).to.deep.equal([resolution]);
      expect(spyGetResolutionsByUserId.calledOnce).to.be.true;
      expect(spyGetResolutionsByUserId.calledWith(userId)).to.be.true;
    });
  });

  describe('Delete resolution', () => {
    const resolutionId = 1;

    afterEach(() => {
      sandbox.restore();
    });

    it('should throw an error when there is no resolution', async () => {
      sandbox.replace(mysqlResolution, 'removeResolution', () => 0);

      try {
        await resolutionService.deleteResolutionById(resolutionId);
      } catch (err) {
        expect(err.message).to.equal('Resolution not found');
      }
    });

    it('should delete resolution', async () => {
      sandbox.replace(mysqlResolution, 'removeResolution', () => 1);

      const spyRemoveResolution = sandbox.spy(mysqlResolution, 'removeResolution');

      expect(await resolutionService.deleteResolutionById(resolutionId)).to.equal(1);
      expect(spyRemoveResolution.withArgs(resolutionId).calledOnce).to.be.true;
    });
  });
});
