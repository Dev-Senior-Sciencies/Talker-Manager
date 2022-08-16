const express = require('express');
const { auth } = require('../middlewares/index');

const services = require('../services/talkerServices');

const talkerRouter = express.Router();

talkerRouter.get('/', services.getTalkers);

talkerRouter.get('/search', auth.authToken, services.getTalkersSearch);
talkerRouter.get('/:id', services.getTalkersById);

talkerRouter.post('/', auth.authToken,
auth.authName,
auth.authAge,
auth.authTalker,
auth.authWatchedAt, services.getTalkersByPost);

talkerRouter.put('/:id',
auth.authToken,
auth.authName,
auth.authAge,
auth.authTalker,
auth.authWatchedAt,
services.getTalkersByPull);

talkerRouter.delete('/:id', auth.authToken, services.getTalkersByDeleted);

module.exports = {
    talkerRouter,
};