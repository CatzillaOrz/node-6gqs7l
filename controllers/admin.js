const Product = require("../models/product");

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }
  const pId = req.params.id;
  Product.findById(pId, (product) => {
    if (!product) {
      return res.redirect("/");
    }
    res.render("admin/edit-product", {
      path: "/admin/edit-product",
      pageTitle: "Edit-Product",
      editing: editMode,
      product: product,
    });
  });
};

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    path: "/admin/add-product",
    pageTitle: "AddProducts",
    editing: true,
  });
};

exports.postEditProduct = (req, res, next) => {
  const prod = req.body;
  console.log({ ...prod });
  const updatedProduct = new Product(
    prod.id,
    prod.title,
    prod.imageUrl,
    prod.description,
    prod.price
  );
  updatedProduct.save();
  res.redirect("/");
};

exports.getProduct = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("admin/products", {
      prods: products,
      path: "/admin/products",
      pageTitle: "Products",
    });
  });
};
exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const description = req.body.description;
  const price = req.body.price;
  const product = new Product(null, title, imageUrl, description, price);
  product.save();
  res.redirect("/");
};
