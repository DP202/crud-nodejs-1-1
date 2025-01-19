const CategoryModel = require('../models/category.model');

module.exports = {
  getAllCategories: async (req, res) => {
    try {
      const category = await CategoryModel.find();

      return res.status(200).json({
        message: 'Lấy danh sách danh mục thành công',
        data: category,
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Lấy danh sách danh mục thất bại',
        error: error.message,
      });
    }
  },

  createCategory: async (req, res) => {
    const body = req.body;
    try {
      const newCategory = await CategoryModel.create(body);

      return res.status(201).json({
        message: 'Thêm danh mục thành công',
        data: newCategory,
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Tạo danh mục thất bại',
        error: error.message,
      });
    }
  },

  updateCategory: async (req, res) => {
    const id = req.params.id;
    const body = req.body;

    try {
      const updateCategory = await CategoryModel.findByIdAndUpdate(id, body, {
        new: true,
      });

      if (!updateCategory) {
        return res.status(404).json({
          message: 'Không tìm thấy danh mục',
        });
      }

      return res.status(200).json({
        message: 'Cập nhật thông tin danh mục thành công',
        data: updateCategory,
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Lỗi khi cập nhật danh mục ',
        error: error.message,
      });
    }
  },

  deleteCategory: async (req, res) => {
    const id = req.params.id;

    try {
      const deletedCategory = await CategoryModel.findByIdAndDelete(id);

      if (!deletedCategory) {
        return res.status(404).json({
          message: 'Không tìm thấy danh mục',
        });
      }

      return res.status(200).json({
        message: 'Xóa danh mục thành công',
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Lỗi khi xóa danh mục',
        error: error.message,
      });
    }
  },
};
