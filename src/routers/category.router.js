const express = require('express');
const multer = require('multer');
const categoryRouter = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    // console.log(file);

    const lastIndex = file.originalname.lastIndexOf('.'); // tìm dấu . cuối
    let suffix = file.originalname.substring(lastIndex);

    cb(null, file.fieldname + '-' + uniqueSuffix + suffix);
  },
});

const upload = multer({ storage: storage });

const {
  getAllCategories,
  createCategory,
  deleteCategory,
  updateCategory,
} = require('../controllers/category.controller');

categoryRouter
  .route('/')
  .get(getAllCategories)
  .post(upload.single('img'), createCategory);
categoryRouter.route('/:id').delete(deleteCategory).patch(updateCategory);

module.exports = categoryRouter;
