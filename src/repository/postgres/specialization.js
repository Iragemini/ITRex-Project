export default class PGSpecialization {
  constructor(pool) {
    this.pool = pool;
  }

  /**
 *
 * @returns {array} An array of objects
 */
  getAll = async () => {
    const specializations = await this.pool.query('SELECT id, title FROM specializations');

    return specializations.rows;
  };
}
