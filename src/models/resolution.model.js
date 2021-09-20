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
      doctor_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      doctor_specialization: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    }, {
      modelName: 'resolution',
      underscored: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  );

  return Resolution;
};
