import { expect } from 'chai';
import sinon from 'sinon';
import MySQLUser from '../../../src/repository/mysql/user.js';
import db from '../mocks/db.mock.js';

const mysqlUser = new MySQLUser(db);
const sandbox = sinon.createSandbox();

describe('User repository tests', () => {
  const name = 'Patient_1';
  const email = 'email@email.com';
  const gender = 'male';
  const birthDate = '22.01.2016';
  const password = 'password';
  const id = 777;
  const roleId = 1;
  const roleTitle = 'patient';
  const patient = {
    name,
    gender,
    birth_date: birthDate,
  };
  const roles = [
    {
      id: roleId,
      title: roleTitle,
    },
  ];

  const user = {
    id,
    email,
    password,
    patient,
    roles,
  };

  const expectedUser = {
    id,
    email,
    password,
    name,
    gender,
    birthDate,
    roleId,
    roleTitle,
  };

  describe('Create user', () => {
    it('should return user id', async () => {
      db.user.create.withArgs({ email, password }).resolves({ id });
      expect(await mysqlUser.createUser({ email, password })).to.deep.equal({ id });
      expect(db.user.create.calledWith({ email, password })).to.be.true;
    });
  });

  describe('Get user by email', () => {
    it('should return user data', async () => {
      db.user.findOne.resolves(user);

      expect(await mysqlUser.getUserByEmail(email)).to.deep.equal(expectedUser);
      expect(db.user.findOne.called).to.be.true;

      sandbox.restore();
    });
  });

  describe('Get user by id', () => {
    it('should return user data', async () => {
      db.user.findOne.resolves(user);

      expect(await mysqlUser.getUserById(id)).to.deep.equal(expectedUser);
      expect(db.user.findOne.called).to.be.true;
    });
  });
});
