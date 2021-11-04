import { expect } from 'chai';
import PGResolution from '../../../src/repository/postgres/resolution.js';
import { pool } from '../mocks/db.mock.js';

const pgResolution = new PGResolution(pool);

describe('Resolution repository tests', () => {
  const id = 1;
  const resolution = 'resolution';
  const ttl = -1;
  const expire = null;
  const userId = 5;
  const patientId = 5;
  const doctorId = 1;
  const doctorName = 'Doctor_1';
  const doctorSpecialization = 'specialization';
  const patientName = 'Patient';

  const data = {
    doctorId,
    patientId,
    resolution,
    ttl,
  };

  const resolutionData = {
    id,
    patientId,
    doctorId,
    resolution,
    expire,
  };

  const output = [
    {
      ...resolutionData,
      doctorName,
      doctorSpecialization,
    },
  ];

  afterEach(() => {
    pool.query.resetHistory();
  });

  describe('Add resolution', () => {
    it('should add resolution to database', async () => {
      pool.query.resolves({ rows: [resolutionData] });

      expect(await pgResolution.add(data)).to.deep.equal(resolutionData);
      expect(pool.query.calledOnce).to.be.true;
    });
  });

  describe('Get all resolutions with optional name query', () => {
    it('should return resolutions list without optional query', async () => {
      pool.query.resolves({ rows: output });

      expect(await pgResolution.getAllResolutions({}))
        .to.be.deep.equal(output);
      expect(pool.query.calledOnce).to.be.true;
    });

    it('should return resolutions list with optional query', async () => {
      pool.query.resolves({ rows: output });

      expect(await pgResolution.getAllResolutions({ patientName }))
        .to.be.deep.equal(output);
      expect(pool.query.calledOnce).to.be.true;
    });
  });

  describe('Get resolution by user Id', () => {
    it('should return resolutions list with optional query', async () => {
      pool.query.resolves({ rows: output });

      expect(await pgResolution.getResolutionsByUserId(userId))
        .to.be.deep.equal(output);
    });
  });

  describe('Remove resolution', () => {
    it('should delete resolution by id', async () => {
      pool.query.resolves({ rows: output });

      expect(await pgResolution.removeResolution(id))
        .to.be.deep.equal(output);
      expect(pool.query.calledOnce).to.be.true;
    });
  });
});
