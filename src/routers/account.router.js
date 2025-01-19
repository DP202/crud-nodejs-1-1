const express = require('express');

const accountRouter = express.Router();

const {
  createAccount,
  getAllAccounts,
} = require('../controllers/account.controller');

const asyncMiddleware = require('../middlewares/async.middleware');
const authMiddleware = require('../middlewares/auth.middleware');
const roleMiddleware = require('../middlewares/role.middleware');
const typeRole = require('../constant/type.role');

accountRouter
  .route('/')
  .post(
    asyncMiddleware(authMiddleware),
    roleMiddleware([typeRole.ADMIN]),
    asyncMiddleware(createAccount),
  ) // dùng createAccount làm tham số
  .get(asyncMiddleware(getAllAccounts));

module.exports = accountRouter;
