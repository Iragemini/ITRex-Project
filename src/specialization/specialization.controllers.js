import specializationService from './index.js';

const getAll = async (req, res, next) => {
  const specializations = await specializationService.getAll();

  res.status('200').json({ data: specializations });
};

export default getAll;
