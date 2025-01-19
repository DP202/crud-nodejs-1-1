const jwt = require('jsonwebtoken');
const ErrorRespone = require('../helpers/ErrorResponse');
const accountModel = require('../models/account.model');

module.exports = async (req, res, next) => {
  // gửi wa header
  const authorization = req.headers.authorization;
  //   console.log(authorization);

  if (!authorization.startsWith('Bearer')) {
    throw new ErrorRespone(400, 'Invalid token');
  }

  const token = authorization.split(' ')[1];

  const decode = jwt.verify(token, 'asdasfkdaslqweqewe');
  // Nãy mã hóa bằng payload
  // Giờ giải mã thì nó ra đúng thông tin ban nãy payload

  const account = await accountModel.findById(decode._id);

  if (!account) {
    throw new ErrorRespone(401, 'Unauthorize');
  }

  req.account = account; // để nó đi xuyên suốt request , sau có thể sử dụng

  next();
};
