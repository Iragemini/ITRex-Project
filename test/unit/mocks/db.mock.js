import sinon from 'sinon';

const db = {
  resolution: sinon.stub({
    create: () => {},
    update: () => {},
    findAll: () => {},
    findOne: () => {},
    findOrCreate: () => {},
    destroy: () => {},
  }),
  patient: sinon.stub({
    create: () => {},
    findOne: () => {},
    findOrCreate: () => {},
    findByPk: () => {},
    destroy: () => {},
  }),
  doctor: sinon.stub({
    findAll: () => {},
    findOne: () => {},
  }),
  user: sinon.stub({
    create: () => {},
    update: () => {},
    findOne: () => {},
    destroy: () => {},
  }),
  sequelize: sinon.stub({
    query: () => {},
    QueryTypes: { SELECT: 'SELECT' },
  }),
};

export default db;
