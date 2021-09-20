export default (sequelize, Sequelize) => {
  const Specialization = sequelize.define(
    'specialization', {
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    }, {
      modelName: 'specialization',
      underscored: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  );

  return Specialization;
};
