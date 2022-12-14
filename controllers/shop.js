const Product = require("../models/product");
const Order = require("../models/order");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    path: "admin",
    pageTitle: "Add-Product",
    activeProduct: true,
    productCss: true,

    isAuthenticated: req.session.isLoggedIn,
  });
};

exports.postAddProduct = (req, res, next) => {
  const product = new Product(req.body.title);
  product.save();
  res.redirect("/");
};

exports.getProducts = (req, res, next) => {
  Product.find()
    .then((products) => {
      res.render("shop/product-list", {
        prods: products,
        pageTitle: "All Products",
        path: "/products",
        isAuthenticated: req.session.isLoggedIn,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getIndex = (req, res, next) => {
  Product.find()
    .then((products) => {
      res.render("shop/index", {
        prods: products,
        pageTitle: "Shop Index",
        path: "/",
        isAuthenticated: req.session.isLoggedIn,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getCart = (req, res, next) => {
  req.session.user
    .populate("cart.items.productId")
    .then((user) => {
      const products = user.cart.items;
      res.render("shop/cart", {
        pageTitle: "Shop Cart",
        path: "/cart",
        products: products,
        isAuthenticated: req.session.isLoggedIn,
      });
    })
    .catch((err) => console.log(err));
};

exports.postOrder = (req, res, next) => {
  req.session.user
    .populate("cart.items.productId")
    .then((user) => {
      const products = user.cart.items.map((e) => {
        return {
          quantity: e.quantity,
          product: { ...e.productId._doc },
        };
      });
      const order = new Order({
        products: products,
        user: {
          name: req.session.user.name,
          userId: req.session.user,
        },
      });
      return order.save();
    })
    .then((_) => {
      return req.session.user.clearCart();
    })
    .then((_) => {
      res.redirect("/orders");
    })
    .catch((err) => console.log(err));
};

exports.getOrders = (req, res, next) => {
  Order.find({ "user.id": req.session.user._id })
    .then((orders) => {
      res.render("shop/orders", {
        pageTitle: "Shop Orders",
        path: "/orders",
        orders: orders,
        isAuthenticated: req.session.isLoggedIn,
      });
    })
    .catch((err) => console.log(err));
};

exports.getDetail = (req, res, next) => {
  const pId = req.params.id;
  Product.findById(pId)
    .then((product) => {
      res.render("shop/product-detail", {
        product: product,
        path: "/products",
        pageTitle: "Detail",
      });
    })
    .catch((err) => console.log(err));
};

exports.postCart = (req, res, next) => {
  const pId = req.body.id;
  Product.findById(pId)
    .then((product) => {
      return req.session.user.addToCart(product);
    })
    .then((_) => res.redirect("/cart"))
    .catch((err) => console.log(err));
};

exports.deleteCartById = (req, res, next) => {
  const pId = req.body.id;
  req.session.user
    .removeFromCart(pId)
    .then((_) => {
      res.redirect("/cart");
    })
    .catch((err) => console.log(err));
};

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
