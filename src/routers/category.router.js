const express = require('express');

const categoryRouter = express.Router();

const {
  getAllCategories,
  createCategory,
  deleteCategory,
  updateCategory,
} = require('../controllers/category.controller');

categoryRouter.route('/').get(getAllCategories).post(createCategory);
categoryRouter.route('/:id').delete(deleteCategory).patch(updateCategory);

module.exports = categoryRouter;
