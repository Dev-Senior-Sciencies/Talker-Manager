const { token } = require('../middlewares/authMiddleware');

const HTTP_OK_STATUS = 200;

const postLogin = (req, res, _next) => {
    const { email, password } = req.body;

    const newToken = token();

    return res.status(HTTP_OK_STATUS).json({ email, password, token: newToken });
};

  module.exports = {
    postLogin,
};
