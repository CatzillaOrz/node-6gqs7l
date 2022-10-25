const Product = require("../models/product");
const Cart = require("../models/cart");

exports.getAddProduct = (req, res, next) => {
    res.render("admin/edit-product", {
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

exports.getProducts = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render("shop/product-list", {
            prods: products,
            pageTitle: "All Products",
            path: "/products",
        });
    });
};

exports.getIndex = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render("shop/index", {
            prods: products,
            pageTitle: "Shop Index",
            path: "/",
        });
    });
};

exports.getCart = (req, res, next) => {
    res.render("shop/cart", {
        pageTitle: "Shop Cart",
        path: "/cart",
    });
};


exports.getOrders = (req, res, next) => {
    res.render("shop/orders", {
        pageTitle: "Shop Orders",
        path: "/orders",
    });
};

exports.getDetail = (req, res, next) => {
    const pId = req.params.id;
    Product.findById(pId, product => {
        res.render("shop/product-detail", {
            product: product,
            path: "/products",
            pageTitle: "Detail",
        });
    })

};

exports.postCart = (req, res, next) => {
    const pId = req.body.id;
    Product.findById(pId, product => {
        Cart.addProduct(pId, product.price);
        res.render("shop/cart", {
            product: product,
            path: "/cart",
            pageTitle: "Cart",
        });
    })

}

exports.deleteProduct = (req, res, next) => {
    res.render("shop/checkout", {
        path: "/checkout",
        pageTitle: "Checkout",
    });
};

exports.getCheckout = (req, res, next) => {
    res.render("shop/checkout", {
        path: "/checkout",
        pageTitle: "Checkout",
    });
};
