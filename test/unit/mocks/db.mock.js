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
};

export default db;
