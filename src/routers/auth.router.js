const express = require('express');

const authRouter = express.Router();

const asyncMiddleware = require('../middlewares/async.middleware');
const { register, login } = require('../controllers/auth.controller');

authRouter.route('/register').post(asyncMiddleware(register));
authRouter.route('/login').post(asyncMiddleware(login));

module.exports = authRouter;
