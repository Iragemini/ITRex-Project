export default (sequelize, Sequelize) => {
  const Role = sequelize.define('role', {
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });

  return Role;
};
