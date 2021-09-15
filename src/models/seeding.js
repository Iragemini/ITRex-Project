import bcrypt from 'bcryptjs';

const roles = [
  {
    whereObject: { title: 'patient' },
    defaultsObject: {
      id: 1,
      title: 'patient',
    },
  },
  {
    whereObject: { title: 'doctor' },
    defaultsObject: {
      id: 2,
      title: 'doctor',
    },
  },
];

const spec = [
  {
    whereObject: { title: 'pediatrician' },
    defaultsObject: {
      id: 1,
      title: 'pediatrician',
    },
  },
  {
    whereObject: { title: 'dermatologist' },
    defaultsObject: {
      id: 2,
      title: 'dermatologist',
    },
  },
  {
    whereObject: { title: 'psychiatrist' },
    defaultsObject: {
      id: 3,
      title: 'psychiatrist',
    },
  },
];

const users = [
  {
    whereObject: { email: 'doctor1@gmail.com' },
    defaultsObject: {
      email: 'doctor1@gmail.com',
      password: bcrypt.hashSync('12345678', 8),
    },
  },
  {
    whereObject: { email: 'doctor2@gmail.com' },
    defaultsObject: {
      email: 'doctor2@gmail.com',
      password: bcrypt.hashSync('12345678', 8),
    },
  },
  {
    whereObject: { email: 'doctor3@gmail.com' },
    defaultsObject: {
      email: 'doctor3@gmail.com',
      password: bcrypt.hashSync('12345678', 8),
    },
  },
];

const doctors = [
  {
    whereObject: { name: 'Lyolik' },
    defaultsObject: {
      name: 'Lyolik',
    },
  },
  {
    whereObject: { name: 'Ms. Andersen' },
    defaultsObject: {
      name: 'Ms. Andersen',
    },
  },
  {
    whereObject: { name: 'Mr. Lecter' },
    defaultsObject: {
      name: 'Mr. Lecter',
    },
  },
];

const initRoles = (db) => {
  for (let i = 0; i < roles.length; i += 1) {
    db.role.findOrCreate({
      where: roles[i].whereObject,
      defaults: roles[i].defaultsObject,
    });
  }

  for (let i = 0; i < spec.length; i += 1) {
    db.specialization.findOrCreate({
      where: spec[i].whereObject,
      defaults: spec[i].defaultsObject,
    });
  }
};

const initDoctors = async (db) => {
  const doctorOne = await db.user.findOrCreate({
    where: users[0].whereObject,
    defaults: users[0].defaultsObject,
  });

  doctorOne[0].setRoles([2]);

  const doctorTwo = await db.user.findOrCreate({
    where: users[1].whereObject,
    defaults: users[1].defaultsObject,
  });

  doctorTwo[0].setRoles([2]);

  const doctorThree = await db.user.findOrCreate({
    where: users[2].whereObject,
    defaults: users[2].defaultsObject,
  });

  doctorThree[0].setRoles([2]);

  db.doctor.findOrCreate({
    where: doctors[0].whereObject,
    defaults: {
      user_id: doctorOne[0].id,
      name: doctors[0].defaultsObject.name,
    },
  }).then((doctor) => {
    doctor[0].setSpecializations([1]);
  });

  db.doctor.findOrCreate({
    where: doctors[1].whereObject,
    defaults: {
      user_id: doctorTwo[0].id,
      name: doctors[1].defaultsObject.name,
    },
  }).then((doctor) => {
    doctor[0].setSpecializations([2]);
  });

  db.doctor.findOrCreate({
    where: doctors[2].whereObject,
    defaults: {
      user_id: doctorThree[0].id,
      name: doctors[2].defaultsObject.name,
    },
  }).then((doctor) => {
    doctor[0].setSpecializations([3]);
  });
};

const seed = async (db) => {
  initRoles(db);
  await initDoctors(db);
};

export default seed;
