// Phân quyền

const ErrorRespone = require('../helpers/ErrorResponse');

module.exports = (roles = []) => {
  if (typeof roles === 'string') {
    roles = [roles]; // là chuỗi thì gán thành mảng
  }

  return (req, res, next) => {
    // Sử dụng sau khi đã xác thực -> Nên sau khi xác thực thì sẽ lấy được tài khoản
    // Mà thông tin xác thực nó nằm trong req.account
    // Vì vậy lấy nó ra
    const account = req.account;

    if (!roles.includes(account.role)) {
      throw new ErrorRespone(403, 'Forbiden'); // lỗi này tiếng việt -> ko có quyền đăng nhập
    }

    next(); // có quyền thì next
  };
};
