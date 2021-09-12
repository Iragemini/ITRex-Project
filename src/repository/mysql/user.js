export default class MySQLUser {
  constructor(db) {
    this.db = db;
    this.sequelize = db.sequelize;
    this.User = this.db.user;
  }

  createUser = async (data) => {
    let userData;

    try {
      userData = await this.User.create(data);
      if (data.role === 'patient') {
        userData.setRoles(1);
      }
    } catch (error) {
      console.log(error);
    }

    return userData;
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
  // updateUser = async (id, data) => {
  //   const user = await this.User.update(data, { where: { id } });

  //   return user;
  // };

  // /* not used */
  // deleteUser = async (id) => {
  //   await this.User.destroy({ where: { id } });
  // };

  // /* not used */
  // isUserExists = async (id) => {
  //   const user = await this.User.findOne({
  //     where: { id },
  //   });
  //   if (!user) {
  //     return false;
  //   }
  //   return true;
  // };
}
