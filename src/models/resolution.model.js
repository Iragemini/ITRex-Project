export default (sequelize, Sequelize) => {
  const Resolution = sequelize.define('resolution', {
    resolution: {
      type: Sequelize.STRING,
    },
    expire: {
      type: Sequelize.DATE,
      allowNull: true,
    },
  });

  return Resolution;
};
