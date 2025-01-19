const accountRouter = require('./account.router');
const categoryRouter = require('./category.router');
const productRouter = require('./product.router');
const errorHandle = require('../middlewares/error.handle');
const authRouter = require('./auth.router');

module.exports = (app) => {
  app.use('/api/auth', authRouter);
  app.use('/api/products', productRouter);
  app.use('/api/categories', categoryRouter);
  app.use('/api/accounts', accountRouter);

  // file error.handle đặt dưới này , vì tất cả các api đều có thể xảy ra lỗi
  app.use(errorHandle);
};
