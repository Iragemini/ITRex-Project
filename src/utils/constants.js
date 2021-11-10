const roles = Object.freeze({
  patient: 'patient',
  doctor: 'doctor',
  admin: 'admin',
});

const repositoryTypes = Object.freeze({
  mysql: 'mysql',
  postgres: 'postgres',
});

const doctorCache = Object.freeze({
  allDoctors: 'cachedData:doctors:all',
  prefix: 'cachedData:doctor:id',
});

export default { roles, repositoryTypes, doctorCache };
