const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');

const typeRole = require('../constant/type.role');

const accountSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
    role: {
      type: String,
      enum: [...Object.values(typeRole)], //["user", "admin"],
      default: typeRole.USER,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

// middleware trong mongoose

// Middleware để ko hiển thị mật khẩu
accountSchema.set('toJSON', {
  transform: function (doc, ret, options) {
    // chuyển đổi
    // tham số ret chính là cái bảng ghi trả về
    delete ret.password; // xóa password -> khi hiển thị thông tin tài khoản thì sẽ ko hiển thị password
  },
});

// Trước khi lưu làm gì đó ...
accountSchema.pre('save', function (next) {
  const account = this; // accountSchema trước khi lưu thì lấy tài khoản ra
  // console.log(this);

  if (account.password) {
    account.password = bcryptjs.hashSync(account.password, 10);
  }

  next();
});

// Middleware đảm bảo rằng mật khẩu luôn được mã hóa nếu có sự thay đổi trong quá trình update
accountSchema.pre('findOneAndUpdate', function (next) {
  const account = { ...this.getUpdate() };
  if (account.password) {
    account.password = bcryptjs.hashSync(account.password, 10);
  }
  this.setUpdate(account);
  next();
});

// Middleware mã hóa mật khẩu trước khi cập nhật
accountSchema.pre('findByIdAndUpdate', function (next) {
  const account = { ...this.getUpdate() };
  if (account.password) {
    account.password = bcryptjs.hashSync(account.password, 10);
  }
  this.setUpdate(account);
  next();
});

module.exports = mongoose.model('account', accountSchema);
