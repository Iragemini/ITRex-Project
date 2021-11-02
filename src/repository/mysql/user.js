import constants from '../../utils/constants.js';

export default class MySQLUser {
  constructor(db) {
    this.db = db;
    this.sequelize = db.sequelize;
    this.user = this.db.user;
  }

  static mapper(userData) {
    const {
      id,
      email,
      password,
      patient,
      roles: [{
        id: roleId,
        title: roleTitle,
      }],
    } = userData;

    const {
      name,
      gender,
      birth_date: birthDate,
    } = patient || {};

    const result = roleTitle === constants.roles.patient
      ? {
        id,
        email,
        password,
        name,
        gender,
        birthDate,
        roleId,
        roleTitle,
      }
      : {
        id,
        email,
        password,
        roleId,
        roleTitle,
      };

    return result;
  }

  createUser = async (data) => {
    const newUser = await this.user.create(data);

    if (data.role === constants.roles.patient) {
      newUser.setRoles(1);
    }

    return newUser;
  };

  getUserByEmail = async (email) => {
    const foundUser = await this.user.findOne({
      where: { email },
      include: [
        {
          model: this.db.role,
          attributes: ['id', 'title'],
        },
        {
          model: this.db.patient,
          attributes: ['name', 'gender', 'birth_date'],
        },
      ],
    });

    if (!foundUser) {
      return null;
    }

    return MySQLUser.mapper(foundUser);
  };

  getUserById = async (id) => {
    const foundUser = await this.user.findOne({
      where: { id },
      include: [
        {
          model: this.db.role,
          attributes: ['id', 'title'],
        },
        {
          model: this.db.patient,
          attributes: ['name', 'gender', 'birth_date'],
        },
      ],
    });

    if (!foundUser) {
      return null;
    }

    return MySQLUser.mapper(foundUser);
  };
}
