export default (sequelize, Sequelize) => {
  const Resolution = sequelize.define('resolution', {
    resolution: {
      type: Sequelize.STRING,
    },
    ttl: {
      type: Sequelize.TIME,
      allowNull: true,
    },
  });

  return Resolution;
};
