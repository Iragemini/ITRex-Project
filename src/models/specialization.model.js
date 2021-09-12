export default (sequelize, Sequelize) => {
  const Specialization = sequelize.define('specialization', {
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });

  return Specialization;
};
