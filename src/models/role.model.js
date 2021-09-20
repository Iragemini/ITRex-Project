export default (sequelize, Sequelize) => {
  const Role = sequelize.define(
    'role', {
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    }, {
      modelName: 'role',
      underscored: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  );

  return Role;
};
