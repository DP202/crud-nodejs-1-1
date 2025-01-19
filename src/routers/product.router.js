const express = require('express');

const productRouter = express.Router();

const {
  // lấy các hàm trong controllers ra
  createProduct,
  getAllProducts,
  deleteProduct,
  updateProduct,
  addProductViews,
  getProductUpdate,
} = require('../controllers/product.controller');

productRouter.route('/').get(getAllProducts).post(createProduct);

productRouter.route('/:id').delete(deleteProduct).patch(updateProduct);

productRouter.route('/add').get(addProductViews);

productRouter.route('/edit/:id').get(getProductUpdate);

module.exports = productRouter;
