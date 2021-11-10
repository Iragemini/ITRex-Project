import constants from '../../utils/constants.js';

export default class PGUser {
  constructor(pool) {
    this.pool = pool;
  }

  getRole = async (data = {}) => {
    const { id, title } = data;

    const WHERE = id ? 'WHERE id = $1' : 'WHERE title = $1';
    const params = id ? [id] : [title];

    const query = Object.keys(data).length
      ? `SELECT * FROM roles ${WHERE}`
      : 'SELECT * FROM roles';

    const result = await this.pool.query(query, params);

    if (!result.rows.length) {
      return {};
    }

    return result.rows;
  }

  createUser = async (data) => {
    const { email, password, role } = data;

    const [{ id: roleId = null }] = role
      ? await this.getRole({ title: role })
      : {};

    const query = `
      INSERT INTO users (role_id, email, password) 
      VALUES ($1, $2, $3) RETURNING *
    `;

    const newUser = await this.pool.query(query, [roleId, email, password]);

    return newUser.rows[0];
  };

  /**
 *
 * @param {string} email
 * @returns {(null|object)} Extended user information (user as doctor or user as patient)
 */
  getUserByEmail = async (email) => {
    const query = 'SELECT * FROM users WHERE email = $1';

    const {
      rows: [userInfo],
    } = await this.pool.query(query, [email]);

    if (!userInfo) {
      return null;
    }

    const result = await this.getExtendedUserInfo(userInfo);

    return result;
  };

  getUserById = async (id) => {
    const query = 'SELECT * FROM users WHERE id=$1';

    const {
      rows: [userInfo],
    } = await this.pool.query(query, [id]);

    if (!userInfo) {
      return null;
    }

    const result = await this.getExtendedUserInfo(userInfo);

    return result;
  };

  getExtendedPatientInfo = async (userID) => {
    const query = 'SELECT * FROM patients WHERE user_id = $1';

    const {
      rows: [patient],
    } = await this.pool.query(query, [userID]);

    if (!patient) {
      return {};
    }

    return {
      name: patient.name,
      gender: patient.gender,
      birthDate: patient.birth_date,
    };
  };

  getExtendedDoctorInfo = async (userID) => {
    const query = 'SELECT * FROM doctors WHERE user_id = $1';

    const {
      rows: [doctor],
    } = await this.pool.query(query, [userID]);

    if (!doctor) {
      return {};
    }

    return { name: doctor.name };
  };

  getExtendedUserInfo = async (userInfo) => {
    const {
      id,
      role_id: roleID,
      email,
      password,
    } = userInfo;

    let additionalData = {};

    const [{ title: roleTitle }] = roleID
      ? await this.getRole({ id: roleID })
      : null;

    if (roleTitle in constants.roles) {
      additionalData = roleTitle === constants.roles.patient
        ? await this.getExtendedPatientInfo(id)
        : await this.getExtendedDoctorInfo(id);
    }

    return {
      id,
      email,
      password,
      roleID,
      roleTitle,
      ...additionalData,
    };
  };
}
