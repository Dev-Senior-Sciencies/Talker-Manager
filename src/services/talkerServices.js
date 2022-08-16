const HTTP_OK_STATUS = 200;
const fs = require('fs');
const fsOfPromises = require('fs/promises');

const getTalkers = (_req, res, _next) => {
  fs.readFile('./talker.json', 'utf8', (error, talkersSeed) => {
      if (error) {
        res.status(HTTP_OK_STATUS).send();
      }
      const talker = JSON.parse(talkersSeed);
      res.status(200).send(talker);
    });
};

const getTalkersById = (req, res, _next) => {
  fs.readFile('./talker.json', 'utf8', (error, talkersSeed) => {
      const { id } = req.params;
      const talkers = JSON.parse(talkersSeed);
      const result = talkers.find((talker) => talker.id === Number(id));
      if (!result || error) {
          return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
      }
      return res.status(HTTP_OK_STATUS).json(result);
    });
};

const getReadTalker = async () => {
  const date = await fsOfPromises.readFile('./talker.json', 'utf8');

  return JSON.parse(date);
};

const getWriteTalker = async (date) => {
  const getString = JSON.stringify(date, null, 2);

  await fsOfPromises.writeFile('./talker.json', getString, 'utf8');
};

const getTalkersByPost = async (req, res, _next) => {
  const { name, age, talk: { watchedAt, rate } } = req.body;

  const talkers = await getReadTalker();

  const plusTalkers = {
    id: talkers.length + 1,
    name,
    age,
    talk: { 
      watchedAt,
      rate,
    },
  };

  await getWriteTalker([...talkers, plusTalkers]);

  return res.status(201).json(plusTalkers);
};

const getTalkersByPull = async (req, res, _next) => {
  const { id: personId } = req.params;
  const { name, age, talk } = req.body;
  const talkers = await getReadTalker();
  const talkerIndex = talkers.find((talker) => talker.id === Number(personId));

  if (talkerIndex === -1) {
    return res.status(404).json({ message: '404 not Found' });
  }
  talkers[talkerIndex] = { ...talkers[talkerIndex], name, age, talk };

  const pullTalkers = talkers.filter((talker) => talker.id !== Number(personId));
  const id = Number(personId);

  const getAddTalkers = { id, name, age, talk };
  await getWriteTalker([...pullTalkers, getAddTalkers]);
  res.status(200).json(getAddTalkers);
};

const getTalkersByDeleted = async (req, res, _next) => {
  const { id: personId } = req.params;
  const talkers = await getReadTalker();

  const getTalkerId = talkers.filter((talker) => talker.id !== Number(personId));

  await getWriteTalker(getTalkerId);
  res.status(204).end();
};

/* new read file mine did not accept it modified the file */
const readFile = (date) => {
   const result = JSON.parse(fs.readFileSync(`./${date}.json`));
   return result;
};

const getTalkersSearch = async (req, res, _next) => {
   const talkers = readFile('talker');

   const q = talkers.filter((per) => per.name.toLowerCase().includes(req.query.q.toLowerCase()));

   return res.status(200).send(q);
};

module.exports = {
    getTalkers,
    getTalkersById,
    getTalkersByPost,
    getTalkersByPull,
    getTalkersByDeleted,
    getTalkersSearch,
};
