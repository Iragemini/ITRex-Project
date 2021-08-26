import db from '../../models/index.js';

export default class MySQLResolution {
  constructor() {
    this.db = db;
    this.Resolution = db.resolution;
  }
}
