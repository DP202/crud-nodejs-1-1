const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const ErrorRespone = require('../helpers/ErrorResponse');
const accountModel = require('../models/account.model');

module.exports = {
  register: async (req, res) => {
    const body = req.body;
    const newAccount = await accountModel.create(body);
    console.log({ newAccount });
    return res.status(201).json(newAccount);
  },

  login: async (req, res) => {
    const { username, password } = req.body;

    // tìm account theo usename trước
    const account = await accountModel.findOne({ username });

    if (!account) {
      //   return res.status(400).json({
      //     statusCode: 400,
      //     message: 'TK hoặc MK không đúng',
      //   });
      throw new ErrorRespone(400, 'Tài khoản hoặc mật khẩu không đúng');
    }

    // Nếu tồn tại username thì kiểm tra password
    if (!bcryptjs.compareSync(password, account.password)) {
      // tham số đầu tiên : MK đăng nhập  // 2 : MK được mã hóa
      throw new ErrorRespone(400, 'Tài khoản hoặc mật khẩu không đúng');
    }

    // jwt
    const payload = {
      // Mã hóa các thông tin :
      _id: account._id,
      username: account.username,
      role: account.role,
    };
    const token = jwt.sign(payload, 'asdasfkdaslqweqewe', {
      expiresIn: '10h', // thời gian hết hạn
    });

    return res.status(200).json({
      ...payload,
      jwt: token,
    });
  },
};
