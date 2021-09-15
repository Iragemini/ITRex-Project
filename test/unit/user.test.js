import { expect } from 'chai';
import sinon from 'sinon';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import MySQLUser from '../../src/repository/mysql/user.js';
import UserService from '../../src/user/user.service.js';
import db from './mocks/db.mock.js';
import patientService from './mocks/patientService.mock.js';
import config from '../../config/config.js';

const {
  auth: { SECRET, JWT_EXPIRE_TIME },
} = config;

const mysqlUser = new MySQLUser(db);
const userService = new UserService(mysqlUser, patientService);

const sandbox = sinon.createSandbox();

describe('User tests', () => {
  const id = 1;
  const name = 'Patient_1';
  const email = 'email@email.com';
  const gender = 'male';
  const birthDate = '22.01.2016';
  const password = 'password';
  const hashPassword = 'hashPassword';
  const userId = 777;
  const token = 'token';
  const user = {
    id,
    name,
    email,
    password,
    gender,
    birthDate,
  };

  describe('Create user', () => {
    afterEach(() => {
      sandbox.restore();
    });

    it('should create new user', async () => {
      const data = {
        name,
        gender,
        birth_date: user.birthDate,
        email,
      };

      sandbox.replace(mysqlUser, 'createUser', () => user);
      sandbox.replace(patientService, 'addPatient', () => undefined);
      sandbox.replace(bcrypt, 'hashSync', () => 'hashPassword');

      const spyCreateUser = sandbox.spy(mysqlUser, 'createUser');
      const spyAddPatient = sandbox.spy(patientService, 'addPatient');
      const spyBcrypt = sandbox.spy(bcrypt, 'hashSync');

      await userService.createUser(user);
      expect(spyCreateUser.withArgs({ email, password: hashPassword, role: 'patient' }).calledOnce).to.be.true;
      expect(spyCreateUser.returned(user)).to.be.true;
      expect(spyAddPatient.withArgs({ user_id: user.id, ...data }).calledOnce).to.be.true;
      expect(spyAddPatient.returned(undefined)).to.be.true;
      expect(spyBcrypt.withArgs(password, 8).calledOnce).to.be.true;
    });
  });

  describe('Authenticate user', () => {
    const userData = {
      id,
      name,
      email,
      gender,
      birthDate,
      password,
    };
    const expectedValue = { token, ...userData };

    beforeEach(() => {
      sandbox.replace(userService, 'getUserByEmail', () => user);
    });

    afterEach(() => {
      sandbox.restore();
    });

    it('should return token and user data when password is valid', async () => {
      sandbox.replace(bcrypt, 'compareSync', () => true);
      sandbox.replace(jwt, 'sign', () => token);

      const spyGetUserByEmail = sandbox.spy(userService, 'getUserByEmail');
      const spyBcrypt = sandbox.spy(bcrypt, 'compareSync');
      const spyJwt = sandbox.spy(jwt, 'sign');

      expect(await userService.authenticate({ email, password })).to.be.deep.equal(expectedValue);
      expect(spyGetUserByEmail.withArgs(email).calledOnce).to.be.true;
      expect(spyBcrypt.returned(true)).to.be.true;
      expect(spyJwt.withArgs({ id: userData.id }, SECRET,
        { expiresIn: JWT_EXPIRE_TIME }).calledOnce).to.be.true;
    });

    it('should throw an error when password is invalid', async () => {
      sandbox.replace(bcrypt, 'compareSync', () => false);
      try {
        await userService.authenticate({ email, password });
      } catch (err) {
        expect(err.message).to.equal('Invalid password');
      }
    });
  });

  describe('Get user data by email', () => {
    afterEach(() => {
      sandbox.restore();
    });

    it('should throw an error when user with specified email not exists', async () => {
      sandbox.replace(mysqlUser, 'getUserByEmail', () => null);
      try {
        await userService.getUserByEmail(email);
      } catch (err) {
        expect(err.message).to.equal(`User for ${email} not found`);
      }
    });

    it('should return user data', async () => {
      sandbox.replace(mysqlUser, 'getUserByEmail', () => user);
      const spyGetUserByEmail = sandbox.spy(mysqlUser, 'getUserByEmail');

      expect(await userService.getUserByEmail(email)).to.equal(user);
      expect(spyGetUserByEmail.withArgs(email).calledOnce).to.be.true;
    });
  });

  describe('Get user data by id', () => {
    afterEach(() => {
      sandbox.restore();
    });

    it('should throw an error when user with specified id not exists', async () => {
      sandbox.replace(mysqlUser, 'getUserById', () => null);
      try {
        await userService.getUserById(userId);
      } catch (err) {
        expect(err.message).to.equal('User not exists');
      }
    });

    it('should return user data', async () => {
      sandbox.replace(mysqlUser, 'getUserById', () => user);
      const spyGetUserById = sandbox.spy(mysqlUser, 'getUserById');

      expect(await userService.getUserById(userId)).to.equal(user);
      expect(spyGetUserById.withArgs(userId).calledOnce).to.be.true;
    });
  });
});
