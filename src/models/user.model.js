export default (sequelize, Sequelize) => {
  const User = sequelize.define(
    'user',
    {
      email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    }, {
      modelName: 'user',
      underscored: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  );

  return User;
};
