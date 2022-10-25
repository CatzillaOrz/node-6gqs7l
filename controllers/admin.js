const Product = require("../models/product");

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode) {
        return res.redirect('/')
    }
    res.render("admin/edit-product", {
        path: "/admin/add-product",
        pageTitle: "Add-Product",
    });
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
    const product = new Product(title, imageUrl, description, price);
    product.save();
    res.redirect("/");
};
