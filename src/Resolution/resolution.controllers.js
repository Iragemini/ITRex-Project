import {
  addResolution,
  findResolution,
  deleteResolution,
} from './resolution.service.js';

export const add = async (req, res) => {
  const name = req.params.name;
  const resolution = req.body.doctorResolution;

  if (!name || !resolution) {
      res.sendStatus(400);
  }
  const ttl = req.body.ttlInput;
  await addResolution(name, resolution, ttl);
  res.redirect('/');
};

export const find = async (req, res) => {
  try {
    const resolution = await findResolution(req.params.name);
    res.status(200).send(JSON.stringify(resolution));
  } catch (e) {
    res.status(e.message).send(JSON.stringify('Not Found'));
  }
};

export const remove = async (req, res) => {
  try {
    await deleteResolution(req.params.name);
    res.sendStatus(204);
  } catch (e) {
    res.status(e.message).send(JSON.stringify('Not Found'));
  }
};
