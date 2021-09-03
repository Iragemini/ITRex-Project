export default class MySQLUser {
  constructor(db) {
    this.db = db;
    this.User = this.db.user;
  }

  createUser = async (data) => {
    const user = await this.User.create(data);
    return user;
  };

  getUserByEmail = async (email) => {
    const user = await this.User.findOne({
      where: { email },
    });
    if (!user) {
      return null;
    }
    return user;
  };

  getUserById = async (id) => {
    const user = await this.User.findOne({
      where: { user_id: id },
    });
    if (!user) {
      return null;
    }
    return user;
  };

  updateUser = async (id, data) => {
    const user = await this.User.update(data, { where: { user_id: id } });
    return user;
  };

  deleteUser = async (id) => {
    await this.User.destroy({ where: { user_id: id } });
  };

  isUserExists = async (id) => {
    const user = await this.User.findOne({
      where: { user_id: id },
    });
    if (!user) {
      return false;
    }
    return true;
  };
}
