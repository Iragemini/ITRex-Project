export default (sequelize, Sequelize) => {
  const Resolution = sequelize.define(
    'resolution',
    {
      resolution: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      expire: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      doctorName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      doctorSpecialization: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    },
    { sequelize, modelName: 'resolution', timestamps: true },
  );

  return Resolution;
};
