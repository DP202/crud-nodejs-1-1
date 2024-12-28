const express = require("express");
const app = express();
const ejs = require("ejs");
const path = require("path");
const PORT = 8888;
const connectDB = require("./src/configs/database");
const ProductModel = require("./src/models/product.model");
const CategoryModel = require("./src/models/category.model");
app.use(express.json()); // xử lý json req body
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
connectDB();

app.set("views", path.join(__dirname, "src", "views"));

app.get("/product", async (req, res) => {
  try {
    const products = await ProductModel.find();
    res.render("list.ejs", { products });
  } catch (error) {
    res.status(500).json({
      message: "Lấy danh sách thất bại",
      error: error.message,
    });
  }
});

app.get("/product/add", (req, res) => {
  res.render("add.ejs");
});

app.get("/product/edit/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id);

  try {
    const product = await ProductModel.findById(id);

    if (!product) {
      return res.status(404).json({
        message: "Không tìm thấy sản phẩm",
      });
    }

    res.render("edit.ejs", { product, productId: id });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Cập nhật sản phẩm thất bại ",
      error: error.message,
    });
  }
});

app.post("/api/products", async (req, res) => {
  const body = req.body;
  try {
    const newProduct = await ProductModel.create(body);

    return res.status(201).json({
      message: "Tạo sản phẩm thành công",
      data: newProduct,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Tạo sản phẩm thất bại",
      error: error.message,
    });
  }
});

app.get("/api/products", async (req, res) => {
  try {
    const products = await ProductModel.find();
    console.log(products);
    return res.status(200).json({
      message: "Lấy danh sách sản phẩm thành công",
      data: products,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Lấy danh sách sản phẩm thất bại",
      error: error.message,
    });
  }
});

app.patch("/api/products/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const body = req.body;

  try {
    const updateProduct = await ProductModel.findByIdAndUpdate(id, body, {
      new: true,
    });

    if (!updateProduct) {
      return res.status(404).json({
        message: "Không tìm thấy sản phẩm",
      });
    }

    return res.status(200).json({
      message: "Cập nhật sản phẩm thành công",
      data: updateProduct,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Cập nhật thông tin sản phẩm thất bại",
      error: error.message,
    });
  }
});

app.delete("/api/products/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const deletedProduct = await ProductModel.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({
        message: "Không tìm thấy sản phẩm",
      });
    }

    return res.status(200).json({
      message: "Xóa sản phẩm thành công",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Xóa sản phẩm thất bại",
      error: error.message,
    });
  }
});

// api category

app.post("/api/categories", async (req, res) => {
  const body = req.body;
  try {
    const newCategory = await CategoryModel.create(body);

    return res.status(201).json({
      message: "Thêm danh mục thành công",
      data: newCategory,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Tạo danh mục thất bại",
      error: error.message,
    });
  }
});

app.get("/api/categories", async (req, res) => {
  try {
    const category = await CategoryModel.find();

    return res.status(200).json({
      message: "Lấy danh sách danh mục thành công",
      data: category,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Lấy danh sách danh mục thất bại",
      error: error.message,
    });
  }
});

app.patch("/api/categories/:id", async (req, res) => {
  const id = req.params.id;
  const body = req.body;

  try {
    const updateCategory = await CategoryModel.findByIdAndUpdate(id, body, {
      new: true,
    });

    if (!updateCategory) {
      return res.status(404).json({
        message: "Không tìm thấy danh mục",
      });
    }

    return res.status(200).json({
      message: "Cập nhật thông tin danh mục thành công",
      data: updateCategory,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi khi cập nhật danh mục ",
      error: error.message,
    });
  }
});

app.delete("/api/categories/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const deletedCategory = await CategoryModel.findByIdAndDelete(id);

    if (!deletedCategory) {
      return res.status(404).json({
        message: "Không tìm thấy danh mục",
      });
    }

    return res.status(200).json({
      message: "Xóa danh mục thành công",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi khi xóa danh mục",
      error: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log("Server run Port : ", PORT);
});
