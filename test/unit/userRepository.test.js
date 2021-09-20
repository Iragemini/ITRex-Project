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
  const id = 777;
  const user = {
    id,
    name,
    email,
    password,
    gender,
    birthDate,
  };

  describe('Create user', () => {
    it('should return user id', async () => {
      db.user.create.withArgs({ email, password }).resolves(user);
      expect(await mysqlUser.createUser({ email, password })).to.be.equal(user);
      expect(db.user.create.calledWith({ email, password })).to.be.true;
    });
  });

  describe('Get user by email', () => {
    it('should return user data', async () => {
      db.user.findOne.resolves(user);

      expect(await mysqlUser.getUserByEmail(email)).to.be.deep.equal(user);
      expect(db.user.findOne.calledWith({
        raw: true,
        where: { email },
        include: [
          db.role,
        ],
      })).to.be.true;

      sandbox.restore();
    });
  });

  describe('Get user by id', () => {
    it('should return user data', async () => {
      db.user.findOne.withArgs({ where: { id } }).resolves(user);

      expect(await mysqlUser.getUserById(id)).to.be.deep.equal(user);
      expect(db.user.findOne.calledWith({
        raw: true,
        where: { id },
        include: [
          db.role,
        ],
      })).to.be.true;
    });
  });
});
