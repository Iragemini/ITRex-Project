export default (sequelize, Sequelize) => {
  const Doctor = sequelize.define(
    'doctor',
    {
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    }, {
      modelName: 'doctor',
      underscored: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  );

  return Doctor;
};
