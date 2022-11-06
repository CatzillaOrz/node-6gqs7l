const Product = require("../models/product");

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }
  const pId = req.params.id;
  Product.findById(pId).then((product) => {
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
    editing: false,
  });
};

exports.postEditProduct = (req, res, next) => {
  const prod = req.body;
  const title = prod.title;
  const price = prod.price;
  const imageUrl = prod.imageUrl;
  const description = prod.description;
  const product = new Product(title, price, description, imageUrl, req.body.id);

  product
    .save()
    .then((_) => {
      console.log("UPDATE PRODUCT SUCCESS");
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.deleteProduct = (req, res, next) => {
  const pId = req.body.id;
  Product.deleteById(pId)
    .then((_) => {
      res.redirect("/admin/products");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getProduct = (req, res, next) => {
  Product.fetchAll().then((products) => {
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
  const product = new Product(title, price, description, imageUrl);
  product
    .save()
    .then((_) => {
      console.log("[mongodb]:creaet product succeed!");
      res.redirect("/");
    })
    .catch((e) => console.log(e));
};
