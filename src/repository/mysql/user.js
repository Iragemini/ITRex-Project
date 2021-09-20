export default class MySQLUser {
  constructor(db) {
    this.db = db;
    this.sequelize = db.sequelize;
    this.User = this.db.user;
  }

  createUser = async (data) => {
    const user = await this.User.create(data);

    if (data.role === 'patient') {
      user.setRoles(1);
    }

    return user;
  };

  getUserByEmail = async (email) => {
    let result = {};

    const user = await this.User.findOne({
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

    if (user) {
      result = {
        id: user.id,
        email: user.email,
        password: user.password,
        name: user.patient.name,
        gender: user.patient.gender,
        birthDate: user.patient.birth_date,
        roleId: user.roles[0].id,
        roleTitle: user.roles[0].title,
      };
      return result;
    }

    return user;
  };

  getUserById = async (id) => {
    let result = {};

    const user = await this.User.findOne({
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

    if (!user) {
      return null;
    }
    result = {
      id: user.id,
      email: user.email,
      password: user.password,
      name: user.patient.name,
      gender: user.patient.gender,
      birthDate: user.patient.birth_date,
      roleId: user.roles[0].id,
      roleTitle: user.roles[0].title,
    };
    return result;
  };

  /* not used */
  updateUser = async (id, data) => {
    const user = await this.User.update(data, { where: { id } });
    return user;
  };

  /* not used */
  deleteUser = async (id) => {
    await this.User.destroy({ where: { id } });
  };
}
