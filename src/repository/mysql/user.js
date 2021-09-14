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
    const user = await this.User.findOne({
      raw: true,
      where: { email },
      include: [
        this.db.role,
      ],
    });

    return user;
  };

  getUserById = async (id) => {
    const user = await this.User.findOne({
      raw: true,
      where: { id },
      include: [
        this.db.role,
      ],
    });

    if (!user) {
      return null;
    }

    return user;
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
