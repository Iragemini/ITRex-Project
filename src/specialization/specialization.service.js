export default class SpecializationService {
  constructor(repository) {
    this.repository = repository;
  }

  getAll = async () => {
    const specializations = await this.repository.getAll();

    return specializations;
  };
}
