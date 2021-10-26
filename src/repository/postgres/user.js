import constants from '../../utils/constants.js';

export default class PGUser {
  constructor(pool) {
    this.pool = pool;
  }

  getRoleID = async (title) => {
    const query = 'SELECT id FROM roles WHERE title = $1';
    const data = await this.pool.query(query, [title]);

    if (!data.rows.length) {
      return null;
    }

    return data.rows[0].id;
  };

  getRoleTitle = async (id) => {
    const query = 'SELECT title FROM roles WHERE id = $1';
    const data = await this.pool.query(query, [id]);

    if (!data.rows.length) {
      return null;
    }

    return data.rows[0].title;
  };

  createUser = async (data) => {
    const { email, password, role } = data;

    const roleId = role ? await this.getRoleID(role) : null;

    const query = `
      INSERT INTO users (role_id, email, password) 
      VALUES ($1, $2, $3) RETURNING *
    `;

    const newUser = await this.pool.query(query, [roleId, email, password]);

    return newUser.rows[0];
  };

  getUserByEmail = async (email) => {
    const query = 'SELECT * FROM users WHERE email = $1';

    const {
      rows: [userInfo],
    } = await this.pool.query(query, [email]);

    if (!userInfo || Object.keys(userInfo).length === 0) {
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

    if (!userInfo || Object.keys(userInfo).length === 0) {
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

    if (!patient || Object.keys(patient).length === 0) {
      return {};
    }

    const patientData = {
      name: patient.name,
      gender: patient.gender,
      birthDate: patient.birth_date,
    };

    return patientData;
  };

  getExtendedDoctorInfo = async (userID) => {
    const query = 'SELECT * FROM doctors WHERE user_id = $1';

    const {
      rows: [doctor],
    } = await this.pool.query(query, [userID]);

    if (!doctor || Object.keys(doctor).length === 0) {
      return {};
    }

    const doctorData = {
      name: doctor.name,
    };

    return doctorData;
  };

  getExtendedUserInfo = async (userInfo) => {
    const {
      id,
      role_id: roleID,
      email,
      password,
    } = userInfo;

    let additionalData = {};

    const roleTitle = roleID ? await this.getRoleTitle(roleID) : null;

    if (roleTitle in constants.roles) {
      additionalData = roleTitle === constants.roles.patient
        ? await this.getExtendedPatientInfo(id)
        : await this.getExtendedDoctorInfo(id);
    }

    const result = {
      id,
      email,
      password,
      roleID,
      roleTitle,
      ...additionalData,
    };

    return result;
  };
}
