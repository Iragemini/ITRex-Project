export default class MySQLUser {
  constructor(db) {
    this.db = db;
    this.sequelize = db.sequelize;
    this.User = this.db.user;
  }

  createUser = async (data) => {
    const user = await this.User.create(data);
    return user.id;
  };

  getUserByEmail = async (email) => {
    const [user] = await this.sequelize.query(
      `SELECT users.password, patients.* FROM users RIGHT JOIN patients 
      ON users.id = patients.user_id WHERE users.email = '${email}'`,
      { type: this.sequelize.QueryTypes.SELECT },
    );
    return user;
  };

  getUserById = async (id) => {
    const user = await this.User.findOne({
      where: { id },
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

  /* not used */
  isUserExists = async (id) => {
    const user = await this.User.findOne({
      where: { id },
    });
    if (!user) {
      return false;
    }
    return true;
  };
}
