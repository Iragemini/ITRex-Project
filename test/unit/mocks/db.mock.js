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
    findOne: () => {},
    findOrCreate: () => {},
    findByPk: () => {},
    destroy: () => {},
  }),
};

export default db;
