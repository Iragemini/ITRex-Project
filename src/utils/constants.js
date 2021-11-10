const roles = Object.freeze({
  patient: 'patient',
  doctor: 'doctor',
  admin: 'admin',
});

const repositoryTypes = Object.freeze({
  mysql: 'mysql',
  postgres: 'postgres',
});

export default { roles, repositoryTypes };
