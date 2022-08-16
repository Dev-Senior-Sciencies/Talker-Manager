const errorMiddleware = require('./errorMiddleware');
const auth = require('./authMiddleware');

module.exports = {
    errorMiddleware,
    auth,
};
