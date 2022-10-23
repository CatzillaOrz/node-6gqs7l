const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  //res.sendFile(path.join(rootDir, "views", "add-product.html"));
  res.render("admin/add-product", {
    path: "admin",
    pageTitle: "Add-Product",
    activeProduct: true,
    productCss: true,
  });
};

exports.postAddProduct = (req, res, next) => {
  const product = new Product(req.body.title);
  product.save();
  res.redirect("/");
};
