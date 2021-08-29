import sinon from 'sinon';

const db = {
  resolution: sinon.stub({
    create: () => {},
    update: () => {},
    findAll: () => {},
    destroy: () => {},
  }),
};

export default db;
