import { expect } from 'chai';
import sinon from 'sinon';
import PGUser from '../../../src/repository/postgres/user.js';
import { pool } from '../mocks/db.mock.js';

const pgUser = new PGUser(pool);
const sandbox = sinon.createSandbox();

describe('User repository tests', () => {
  const email = 'email@email.com';
  const password = 'password';
  const id = 777;

  const patient = {
    name: 'Patient_1',
    email,
    gender: 'male',
    birthDate: '22.01.2016',
    roleID: 1,
    roleTitle: 'patient',
  };

  const doctor = {
    name: 'Doctor_1',
    email,
    roleID: 2,
    roleTitle: 'doctor',
  };

  const user = {
    id,
    email,
    password,
  };

  const userAsPatient = {
    ...user,
    role_id: patient.roleID,
  };

  const userAsDoctor = {
    ...user,
    role_id: doctor.roleID,
  };

  const patientData = {
    ...user,
    ...patient,
  };

  const doctorData = {
    ...user,
    ...doctor,
  };

  afterEach(() => {
    sandbox.restore();
    pool.query.resetHistory();
  });

  describe('Create user', () => {
    it('should return new user', async () => {
      sandbox.replace(pgUser, 'getRole', () => [{ id: patient.roleID }]);
      const spyGetRole = sandbox.spy(pgUser, 'getRole');

      pool.query.resolves({
        rows: [userAsPatient],
      });

      expect(await pgUser.createUser({
        email: patient.email,
        password,
        role: patient.roleTitle,
      })).to.be.deep.equal(userAsPatient);
      expect(pool.query.calledOnce).to.be.true;
      expect(spyGetRole.calledOnce).to.be.true;
      expect(spyGetRole.calledBefore(pool.query)).to.be.true;
    });
  });

  describe('Get user by email', () => {
    it('should return patient data', async () => {
      pool.query.resolves({
        rows: [userAsPatient],
      });

      sandbox.replace(pgUser, 'getExtendedUserInfo', () => patientData);
      const spyGetExtendedUserInfo = sandbox.spy(pgUser, 'getExtendedUserInfo');

      expect(await pgUser.getUserByEmail(patient.email))
        .to.be.equal(patientData);
      expect(pool.query.calledOnce).to.be.true;
      expect(spyGetExtendedUserInfo.calledAfter(pool.query)).to.be.deep.true;
      expect(spyGetExtendedUserInfo.calledOnce).to.be.true;
    });

    it('should return doctor data', async () => {
      pool.query.resolves({
        rows: [userAsDoctor],
      });

      sandbox.replace(pgUser, 'getExtendedUserInfo', () => doctorData);
      const spyGetExtendedUserInfo = sandbox.spy(pgUser, 'getExtendedUserInfo');

      expect(await pgUser.getUserByEmail(doctor.email))
        .to.be.deep.equal(doctorData);
      expect(pool.query.calledOnce).to.be.true;
      expect(spyGetExtendedUserInfo.calledAfter(pool.query)).to.be.true;
      expect(spyGetExtendedUserInfo.calledOnce).to.be.true;
    });
  });

  describe('Get user by id', () => {
    it('should return patient data', async () => {
      pool.query.resolves({
        rows: [userAsPatient],
      });

      sandbox.replace(pgUser, 'getExtendedUserInfo', () => patientData);
      const spyGetExtendedUserInfo = sandbox.spy(pgUser, 'getExtendedUserInfo');

      expect(await pgUser.getUserById(id)).to.be.deep.equal(patientData);
      expect(pool.query.calledOnce).to.be.true;
      expect(spyGetExtendedUserInfo.calledAfter(pool.query)).to.be.true;
      expect(spyGetExtendedUserInfo.calledOnce).to.be.true;
    });

    it('should return doctor data', async () => {
      pool.query.resolves({
        rows: [userAsDoctor],
      });

      sandbox.replace(pgUser, 'getExtendedUserInfo', () => doctorData);
      const spyGetExtendedUserInfo = sandbox.spy(pgUser, 'getExtendedUserInfo');

      expect(await pgUser.getUserById(doctor.email))
        .to.be.deep.equal(doctorData);
      expect(pool.query.calledOnce).to.be.true;
      expect(spyGetExtendedUserInfo.calledAfter(pool.query)).to.be.true;
      expect(spyGetExtendedUserInfo.calledOnce).to.be.true;
    });
  });

  describe('[METHOD] getExtendedUserInfo()', () => {
    it('should return patient data', async () => {
      sandbox.replace(pgUser, 'getRole', () => [{ title: patient.roleTitle }]);
      sandbox.replace(pgUser, 'getExtendedPatientInfo', () => ({
        name: patient.name,
        gender: patient.gender,
        birthDate: patient.birthDate,
      }));
      const spyGetRole = sandbox.spy(pgUser, 'getRole');
      const spyGetExtendedPatientInfo = sandbox.spy(pgUser, 'getExtendedPatientInfo');

      expect(await pgUser.getExtendedUserInfo(userAsPatient))
        .to.be.deep.equal(patientData);
      expect(spyGetRole.calledBefore(spyGetExtendedPatientInfo)).to.be
        .true;
      expect(spyGetRole.calledOnce).to.be.true;
      expect(spyGetExtendedPatientInfo.calledOnce).to.be.true;
    });

    it('should return doctor data', async () => {
      sandbox.replace(pgUser, 'getRole', () => [{ title: doctor.roleTitle }]);
      sandbox.replace(pgUser, 'getExtendedDoctorInfo', () => ({
        name: doctor.name,
      }));
      const spyGetRole = sandbox.spy(pgUser, 'getRole');
      const spyGetExtendedDoctorInfo = sandbox.spy(pgUser, 'getExtendedDoctorInfo');

      expect(await pgUser.getExtendedUserInfo(userAsDoctor))
        .to.be.deep.equal(doctorData);
      expect(spyGetRole.calledBefore(spyGetExtendedDoctorInfo)).to.be.true;
      expect(spyGetRole.calledOnce).to.be.true;
      expect(spyGetExtendedDoctorInfo.calledOnce).to.be.true;
    });
  });

  describe('[METHOD] getRole()', () => {
    it('should return role entity', async () => {
      const roleEntity = {
        id: patient.roleID,
        title: patient.roleTitle,
      };
      pool.query.resolves({
        rows: [roleEntity],
      });

      expect(await pgUser.getRole({ title: patient.roleTitle }))
        .to.deep.equal([roleEntity]);
      expect(await pgUser.getRole({ id: patient.roleID }))
        .to.deep.equal([roleEntity]);
      expect(await pgUser.getRole())
        .to.deep.equal([roleEntity]);
      expect(pool.query.callCount).to.be.equal(3);
    });

    it('should return {}', async () => {
      pool.query.resolves({
        rows: [],
      });

      expect(await pgUser.getRole({ title: patient.roleTitle })).to.deep.equal({});
      expect(pool.query.calledOnce).to.be.true;
    });
  });

  describe('[METHOD] getExtendedPatientInfo()', () => {
    it('should return patient info', async () => {
      pool.query.resolves({
        rows: [{
          name: patient.name,
          gender: patient.gender,
          birthDate: patient.birth_date,
        }],
      });

      expect(await pgUser.getExtendedPatientInfo(user.id))
        .to.be.deep.equal({
          name: patient.name,
          gender: patient.gender,
          birthDate: patient.birth_date,
        });
      expect(pool.query.calledOnce).to.be.true;
    });

    it('should return empty object', async () => {
      pool.query.resolves({
        rows: [],
      });

      expect(await pgUser.getExtendedPatientInfo(user.id)).to.be.deep.equal({});
      expect(pool.query.calledOnce).to.be.true;
    });
  });

  describe('[METHOD] getExtendedDoctorInfo()', () => {
    it('should return doctor info', async () => {
      pool.query.resolves({
        rows: [{ name: doctor.name }],
      });

      expect(await pgUser.getExtendedDoctorInfo(user.id))
        .to.be.deep.equal({ name: doctor.name });
      expect(pool.query.calledOnce).to.be.true;
    });

    it('should return empty object', async () => {
      pool.query.resolves({
        rows: [],
      });

      expect(await pgUser.getExtendedDoctorInfo(user.id)).to.be.deep.equal({});
      expect(pool.query.calledOnce).to.be.true;
    });
  });
});
