const crypto = require('crypto');

const token = () => crypto.randomBytes(8).toString('hex');

const authEmail = (req, res, next) => {
    const { email } = req.body;
    const isValidEmail = (/^\S+@\S+\.\S+$/).test(email);
    if (!email || email.length === 0) {
        return res.status(400).json({ message: 'O campo "email" é obrigatório' });
    }

    if (!isValidEmail) {
        return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
    }
    next();
};

const authPass = (req, res, next) => {
    const { password } = req.body;

    if (!password) {
        return res.status(400).json({ message: 'O campo "password" é obrigatório' });
    }
    if (password.length < 6) {
        return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
    }

    next();
};

const authToken = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).json({ message: 'Token não encontrado' });
    }
    if (authorization.length < 16) {
        return res.status(401).json({ message: 'Token inválido' });
    }
    next();
};

const authName = (req, res, next) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ message: 'O campo "name" é obrigatório' });
    }
    if (name.length <= 3) {
        return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
    }
    next();
};

const authAge = (req, res, next) => {
    const { age } = req.body;
    if (!age) {
        return res.status(400).json({ message: 'O campo "age" é obrigatório' });
    }
    if (age < 18) {
        return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
    }
    next();
};

const authTalker = (req, res, next) => {
    const { talk } = req.body;
    if (!talk) {
        return res.status(400).json({ message: 'O campo "talk" é obrigatório' });
    }

    if (talk.rate < 1 || talk.rate > 5) {
        return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
    }
    next();
};

const authWatchedAt = (req, res, next) => {
  const { talk: { watchedAt, rate } } = req.body;

  const authDateAvailable = /^(\d{2})\/(\d{2})\/(\d{4})$/.test(watchedAt);

  if (!watchedAt) {
    return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
  }

  if (!rate) {
    return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
  }

  if (!authDateAvailable) {   
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }

  next();
};

module.exports = {
    authEmail,
    authPass,
    token,
    authToken,
    authName,
    authAge,
    authTalker,
    authWatchedAt,
};