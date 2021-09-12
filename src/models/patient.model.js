export default (sequelize, Sequelize) => {
  const Patient = sequelize.define(
    'patient',
    {
      email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      gender: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      birth_date: {
        type: Sequelize.DATE,
      },
    }, { sequelize, modelName: 'patient', timestamps: true },
  );

  return Patient;
};
