import { expect } from 'chai';
import sinon from 'sinon';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import MySQLUser from '../../src/repository/mysql/user.js';
import UserService from '../../src/user/user.service.js';
import patientService from './mocks/patientService.mock.js';
import db, { pool } from './mocks/db.mock.js';
import config from '../../config/config.js';
import constants from '../../src/utils/constants.js';
import PGUser from '../../src/repository/postgres/user.js';

const {
  db: { dbType },
  auth: { SECRET, JWT_EXPIRE_TIME, SALT },
} = config;

const repository = dbType === constants.repositoryTypes.mysql
  ? new MySQLUser(db)
  : new PGUser(pool);

const userService = new UserService(repository, patientService);

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

  afterEach(() => {
    sandbox.restore();
  });

  describe('Create user', () => {
    it('should create new user', async () => {
      sandbox.replace(repository, 'createUser', () => user);
      sandbox.replace(patientService, 'addPatient', () => undefined);
      sandbox.replace(bcrypt, 'hashSync', () => 'hashPassword');
      sandbox.replace(userService, 'checkIsEmailExists', () => false);

      const spyCreateUser = sandbox.spy(repository, 'createUser');
      const spyAddPatient = sandbox.spy(patientService, 'addPatient');
      const spyBcrypt = sandbox.spy(bcrypt, 'hashSync');
      const spyCheckIsEmailExists = sandbox.spy(userService, 'checkIsEmailExists');

      await userService.createUser(user);
      expect(spyCreateUser.withArgs({ email, password: hashPassword, role: 'patient' }).calledOnce).to.be.true;
      expect(spyCreateUser.returned(user)).to.be.true;
      expect(spyAddPatient.calledWith(sinon.match.object)).to.be.true;
      expect(spyAddPatient.returned(undefined)).to.be.true;
      expect(spyBcrypt.withArgs(password, SALT).calledOnce).to.be.true;
      expect(spyCheckIsEmailExists.calledBefore(spyCreateUser)).to.be.true;
      expect(spyCreateUser.calledBefore(spyAddPatient)).to.be.true;
      expect(spyCheckIsEmailExists.withArgs(email).calledOnce).to.be.true;
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
    it('should throw an error when user with specified email not exists', async () => {
      sandbox.replace(repository, 'getUserByEmail', () => null);
      try {
        await userService.getUserByEmail(email);
      } catch (err) {
        expect(err.message).to.equal(`User for ${email} not found`);
      }
    });

    it('should return user data', async () => {
      sandbox.replace(repository, 'getUserByEmail', () => user);
      const spyGetUserByEmail = sandbox.spy(repository, 'getUserByEmail');

      expect(await userService.getUserByEmail(email)).to.equal(user);
      expect(spyGetUserByEmail.withArgs(email).calledOnce).to.be.true;
    });
  });

  describe('Get user data by id', () => {
    it('should throw an error when user with specified id not exists', async () => {
      sandbox.replace(repository, 'getUserById', () => null);
      try {
        await userService.getUserById(userId);
      } catch (err) {
        expect(err.message).to.equal('User doesn\'t exist');
      }
    });

    it('should return user data', async () => {
      sandbox.replace(repository, 'getUserById', () => user);
      const spyGetUserById = sandbox.spy(repository, 'getUserById');

      expect(await userService.getUserById(userId)).to.equal(user);
      expect(spyGetUserById.withArgs(userId).calledOnce).to.be.true;
    });
  });
});
