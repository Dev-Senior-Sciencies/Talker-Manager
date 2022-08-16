const express = require('express');
const bodyParser = require('body-parser');
const rescue = require('express-rescue');
const routesTalker = require('./src/routes/talkerRouter');
const routesLogin = require('./src/routes/loginRouter');
const middleware = require('./src/middlewares/index');
const { auth } = require('./src/middlewares/index');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.use('/talker', rescue(routesTalker.talkerRouter));

app.use('/login', auth.authPass, auth.authEmail, rescue(routesLogin.loginRouter));

app.use(middleware.errorMiddleware);

app.listen(PORT, () => {
  console.log('Online');
});
