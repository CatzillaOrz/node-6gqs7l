exports.getAddProduct = (req, res, next) => {
  //res.sendFile(path.join(rootDir, "views", "add-product.html"));
  res.render("add-product", {
    path: "admin",
    pageTitle: "Add-Product",
    activeProduct: true,
    productCss: true,
  });
};

exports.postAddProduct = (req, res, next) => {
  products.push({
    title: req.body.title,
  });
  res.redirect("/");
};
