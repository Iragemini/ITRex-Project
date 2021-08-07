import { expect } from 'chai';
import storage from '../public/storage/storage.js';
import {
  addResolution,
  findResolution,
  deleteResolution,
} from '../public/src/handlers.js';

const { patients } = storage;

describe('Resolution handlers tests', () => {
  const data = [
    {
      name: 'Vasia',
      resolution: 'bed rest',
      ttl: 1,
    },
    {
      name: 'Olga',
      resolution: '',
      ttl: null,
    },
    {
      name: 'Sveta',
      resolution: 'healthy',
      ttl: null,
    },
  ];

  describe('Add new resolution', () => {
    before(() => {
      patients.length = 0;
    });
    const { name, resolution, ttl } = data[0];
    let expire = '';
    before(() => {
      addResolution(name, resolution, ttl);
      expire = ttl ? ttl + Date.now() : '';
    });
    it(`should push {${name}: {resolution: ${resolution}, expire: ${expire}}} object to patients storage`, () => {
      expect(patients[0]).to.have.property(name);
      expect(patients[0][name])
        .to.have.property('resolution')
        .to.equal(resolution);
      expect(patients[0][name]).to.have.property('expire');
    });
  });

  describe('Find resolution by key', () => {
    describe('if patient does not have resolutions', () => {
      const { name, resolution, ttl } = data[1];
      before(() => {
        addResolution(name, resolution, ttl);
      });
      it(`should return "No resolutions" for ${name}`, () => {
        expect(findResolution(name)).to.equal('No resolutions');
      });
    });

    describe('if is not expired', () => {
      const { name, resolution, ttl } = data[2];
      before(() => {
        addResolution(name, resolution, ttl);
      });
      it(`should return "${resolution}" for ${name}`, () => {
        expect(findResolution(name)).to.equal(resolution);
      });
    });

    describe(' if is expired', () => {
      const { name, resolution, ttl } = data[0];
      before(() => {
        patients.length = 0;
        addResolution(name, resolution, ttl);
      });
      beforeEach((done) => {
        setTimeout(() => {
          done();
        }, ttl * 1000);
      });
      it(`should return "No resolutions" for ${name}`, () => {
        expect(findResolution(name)).to.equal('No resolutions');
      });
    });
  });

  describe('Delete resolution', () => {
    const { name } = data[0];
    before(() => {
      patients.length = 0;
      data.forEach((item) =>
        addResolution(item.name, item, item.resolution, item.ttl)
      );
      deleteResolution(name);
    });
    it('should delete resolution from storage', () => {
      expect(findResolution(name)).to.equal('No resolutions');
    });
  });
});
