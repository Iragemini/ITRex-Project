import { expect } from 'chai';
import sinon from 'sinon';
import MySQLUser from '../../src/repository/mysql/user.js';
import db from './mocks/db.mock.js';

const mysqlUser = new MySQLUser(db);
const sandbox = sinon.createSandbox();

describe('User repository tests', () => {
  const name = 'Patient_1';
  const email = 'email@email.com';
  const gender = 'male';
  const birthDate = '22.01.2016';
  const password = 'password';
  const userId = 777;
  const user = {
    name,
    email,
    password,
    gender,
    birthDate,
    birth_date: birthDate,
    userId,
  };

  describe('Create user', () => {
    it('should return user id', async () => {
      db.user.create.withArgs({ email, password }).resolves({ id: userId });
      expect(await mysqlUser.createUser({ email, password })).to.be.equal(userId);
      expect(db.user.create.calledWith({ email, password })).to.be.true;
    });
  });

  describe('Get user by email', () => {
    it('should return user data', async () => {
      db.sequelize.query.resolves([user]);

      expect(await mysqlUser.getUserByEmail(email)).to.be.deep.equal(user);
      expect(db.sequelize.query.calledOnce).to.be.true;

      sandbox.restore();
    });
  });

  describe('Get user data by id', () => {
    it('should return user data', async () => {
      db.user.findOne.withArgs({ where: { id: userId } }).resolves(user);
      expect(await mysqlUser.getUserById(userId)).to.be.deep.equal(user);
      expect(db.user.findOne.calledWith({ where: { id: userId } })).to.be.true;
    });
  });
});
