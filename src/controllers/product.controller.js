const { PER_PAGE } = require('../constant/common');
const productModel = require('../models/product.model');
const ProductModel = require('../models/product.model');

module.exports = {
  createProduct: async (req, res) => {
    const body = req.body;
    try {
      const newProduct = await ProductModel.create(body);

      return res.status(201).json({
        message: 'Tạo sản phẩm thành công',
        data: newProduct,
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Tạo sản phẩm thất bại',
        error: error.message,
      });
    }
  },

  getAllProducts: async (req, res) => {
    try {
      // Tìm theo tên , // query là sau ?
      const { category_id, name, min_price, max_price, page = 1 } = req.query; // kết quả có thể là null || undefined => Nên check đk
      const bodyQuery = {}; // điều kiện cần tìm thì cho vào đây để check

      if (category_id) {
        bodyQuery.category_id = category_id; // bodyQuery lấy category_id từ model
      }

      if (name) {
        // bodyQuery.name = name;  // cái này là tìm kiếm theo tên nhưng mà nó là tuyệt đối
        // Tìm kiếm tương đối => trong sql : like %abc%
        // % trong moongoose là .*
        bodyQuery.name = {
          $regex: `.*${name}.*`, // tìm sản phẩm có name chứa name này
          $options: 'i', // không phân biệt chữ hoa
        };
      }

      // $lt , $gt , $lte , $gte

      if (min_price && max_price) {
        bodyQuery.price = {
          $lte: max_price,
          $gte: min_price,
        };
      }

      const products = await ProductModel.find(bodyQuery)
        .sort({
          name: 1, // tên tăng dần
          createdAt: -1, // giảm dần
        })
        .skip(PER_PAGE * (page - 1)) // bỏ qua số lượng bản ghi trước đó
        .limit(PER_PAGE) // giới hạn số lượng
        .exec();

      const count = await productModel.countDocument(bodyQuery);

      console.log(products);
      return res.status(200).json({
        message: 'Lấy danh sách sản phẩm thành công',
        current_page: page,
        total_page: Math.ceil(count / PER_PAGE),
        data: products,
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Lấy danh sách sản phẩm thất bại',
        error: error.message,
      });
    }
  },

  deleteProduct: async (req, res) => {
    const id = req.params.id;

    try {
      const deletedProduct = await ProductModel.findByIdAndDelete(id);

      if (!deletedProduct) {
        return res.status(404).json({
          message: 'Không tìm thấy sản phẩm',
        });
      }

      return res.status(200).json({
        message: 'Xóa sản phẩm thành công',
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Xóa sản phẩm thất bại',
        error: error.message,
      });
    }
  },

  updateProduct: async (req, res) => {
    const id = req.params.id;
    console.log(id);
    const body = req.body;

    try {
      const updateProduct = await ProductModel.findByIdAndUpdate(id, body, {
        new: true,
      });

      if (!updateProduct) {
        return res.status(404).json({
          message: 'Không tìm thấy sản phẩm',
        });
      }

      return res.status(200).json({
        message: 'Cập nhật sản phẩm thành công',
        data: updateProduct,
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Cập nhật thông tin sản phẩm thất bại',
        error: error.message,
      });
    }
  },

  addProductViews: (req, res) => {
    res.render('add.ejs');
  },

  getProductUpdate: async (req, res) => {
    const id = req.params.id;
    console.log(id);

    try {
      const product = await ProductModel.findById(id);

      if (!product) {
        return res.status(404).json({
          message: 'Không tìm thấy sản phẩm',
        });
      }

      res.render('edit.ejs', { product, productId: id });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: 'Cập nhật sản phẩm thất bại ',
        error: error.message,
      });
    }
  },
};
