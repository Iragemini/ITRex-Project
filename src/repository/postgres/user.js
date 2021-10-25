import constants from '../../utils/constants.js';

export default class PGUser {
  constructor(pool) {
    this.pool = pool;
  }

  getRoleID = async (title) => {
    if (!title) {
      return null;
    }

    const query = 'SELECT id FROM roles WHERE title = $1';
    const data = await this.pool.query(query, [title]);

    if (!data.rows.length) {
      return null;
    }

    return data.rows[0].id;
  };

  getRoleTitle = async (id) => {
    if (!id) {
      return null;
    }

    const query = 'SELECT title FROM roles WHERE id = $1';
    const data = await this.pool.query(query, [id]);

    if (!data.rows.length) {
      return null;
    }

    return data.rows[0].title;
  };

  createUser = async (data) => {
    const { email, password, role } = data;

    const roleId = await this.getRoleID(role);

    const query = `
      INSERT INTO users (role_id, email, password) 
      VALUES ($1, $2, $3) RETURNING *
    `;

    const newUser = await this.pool.query(query, [roleId, email, password]);

    return newUser.rows[0];
  };

  getUserByEmail = async (email) => {
    const query = 'SELECT * FROM users WHERE email = $1';

    const user = await this.pool.query(query, [email]);

    if (!user.rows.length) {
      return null;
    }

    const {
      rows: [userInfo],
    } = user;

    const result = await this.getResult(userInfo);

    return result;
  };

  getUserById = async (id) => {
    const query = 'SELECT * FROM users WHERE id=$1';

    const user = await this.pool.query(query, [id]);

    if (!user.rows.length) {
      return null;
    }

    const {
      rows: [userInfo],
    } = user;

    const result = await this.getResult(userInfo);

    return result;
  };

  getResult = async (userInfo) => {
    let result = {};
    let query = '';
    const roleTitle = await this.getRoleTitle(userInfo.role_id);

    if (!roleTitle) {
      return result;
    }

    if (roleTitle === constants.roles.patient) {
      query = 'SELECT * FROM patients WHERE user_id = $1';
      const data = await this.pool.query(query, [userInfo.id]);
      const {
        rows: [patient],
      } = data;

      result = {
        name: patient.name,
        gender: patient.gender,
        birthDate: patient.birth_date,
      };
    } else {
      query = 'SELECT * FROM doctors WHERE user_id = $1';
      const data = await this.pool.query(query, [userInfo.id]);
      const {
        rows: [doctor],
      } = data;

      result = {
        name: doctor.name,
      };
    }

    result.id = userInfo.id;
    result.email = userInfo.email;
    result.password = userInfo.password;
    result.roleId = userInfo.role_id;
    result.roleTitle = roleTitle;

    return result;
  };
}
