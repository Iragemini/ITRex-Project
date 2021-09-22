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
    whereObject: { name: 'Doctor_1' },
    defaultsObject: {
      name: 'Doctor_1',
    },
  },
  {
    whereObject: { name: 'Doctor_2' },
    defaultsObject: {
      name: 'Doctor_2',
    },
  },
  {
    whereObject: { name: 'Doctor_3' },
    defaultsObject: {
      name: 'Doctor_3',
    },
  },
];

const initRoles = async (db) => {
  await roles.reduce(async (previousPromise, roleObj) => {
    await previousPromise;
    return db.role.findOrCreate({
      where: roleObj.whereObject,
      defaults: roleObj.defaultsObject,
    });
  }, Promise.resolve());

  await spec.reduce(async (previousPromise, specObj) => {
    await previousPromise;
    return db.specialization.findOrCreate({
      where: specObj.whereObject,
      defaults: specObj.defaultsObject,
    });
  }, Promise.resolve());
};

const initDoctors = async (db) => {
  const userOne = await db.user.findOrCreate({
    where: users[0].whereObject,
    defaults: users[0].defaultsObject,
  });

  userOne[0].setRoles([2]);

  const userTwo = await db.user.findOrCreate({
    where: users[1].whereObject,
    defaults: users[1].defaultsObject,
  });

  userTwo[0].setRoles([2]);

  const userThree = await db.user.findOrCreate({
    where: users[2].whereObject,
    defaults: users[2].defaultsObject,
  });

  userThree[0].setRoles([2]);

  const doctorOne = await db.doctor.findOrCreate({
    where: doctors[0].whereObject,
    defaults: {
      user_id: userOne[0].id,
      name: doctors[0].defaultsObject.name,
    },
  });

  doctorOne[0].setSpecializations([1]);

  const doctorTwo = await db.doctor.findOrCreate({
    where: doctors[1].whereObject,
    defaults: {
      user_id: userTwo[0].id,
      name: doctors[1].defaultsObject.name,
    },
  });

  doctorTwo[0].setSpecializations([2]);

  const doctorThree = await db.doctor.findOrCreate({
    where: doctors[2].whereObject,
    defaults: {
      user_id: userThree[0].id,
      name: doctors[2].defaultsObject.name,
    },
  });

  doctorThree[0].setSpecializations([3]);
};

const seed = async (db) => {
  await initRoles(db);
  await initDoctors(db);
};

export default seed;
