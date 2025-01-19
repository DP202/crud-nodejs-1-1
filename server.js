const express = require("express");
const app = express();
const ejs = require("ejs");
const path = require("path");
const PORT = 9090;
const connectDB = require("./src/configs/database");

const routers = require("./src/routers");
app.use(express.json()); // xử lý json req body
app.use(express.urlencoded({ extended: true }));
// app.set("view engine", "ejs");
connectDB();

routers(app);

// app.set("views", path.join(__dirname, "src", "views"));

// app.get("/product", async (req, res) => {
//   try {
//     const products = await ProductModel.find();
//     res.render("list.ejs", { products });
//   } catch (error) {
//     res.status(500).json({
//       message: "Lấy danh sách thất bại",
//       error: error.message,
//     });
//   }
// });

app.listen(PORT, () => {
  console.log("Server run Port : ", PORT);
});

// nhiều lưu id của ít
