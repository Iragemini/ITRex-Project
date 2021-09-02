export default (sequelize, Sequelize) => {
  const Patient = sequelize.define('patient', {
    name: {
      type: Sequelize.STRING,
    },
  });

  return Patient;
};
