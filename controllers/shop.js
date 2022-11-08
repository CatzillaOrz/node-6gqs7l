const Product = require("../models/product");

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
  Product.fetchAll()
    .then((products) => {
      res.render("shop/product-list", {
        prods: products,
        pageTitle: "All Products",
        path: "/products",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll()
    .then((products) => {
      res.render("shop/index", {
        prods: products,
        pageTitle: "Shop Index",
        path: "/",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getCart = (req, res, next) => {
  req.user
    .getCart()
    .then((products) => {
      res.render("shop/cart", {
        pageTitle: "Shop Cart",
        path: "/cart",
        products: products,
      });
    })
    .catch((err) => console.log(err));
};

exports.postOrder = (req, res, next) => {
  let fetchedCart;
  req.user
    .addOrder()
    .then((_) => {
      res.redirect("/orders");
    })
    .catch((err) => console.log(err));
};

exports.getOrders = (req, res, next) => {
  req.user
    .getOrders({ include: ["products"] })
    .then((orders) => {
      res.render("shop/orders", {
        pageTitle: "Shop Orders",
        path: "/orders",
        orders: orders,
      });
    })
    .catch((err) => console.log(err));
};

exports.getDetail = (req, res, next) => {
  const pId = req.params.id;
  /*
            Product.findAll({ where: { id: pId } })
        .then(([product]) => {
            res.render('shop/product-detail', {
                product: product,
                path: '/products',
                pageTitle: 'Detail',
            });
        })
        .catch((err) => console.log(err));

 */
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
      return req.user.addToCart(product);
    })
    .then((_) => res.redirect("/cart"))
    .catch((err) => console.log(err));
};

exports.deleteCartById = (req, res, next) => {
  const pId = req.body.id;
  req.user
    .deleteCartById(pId)
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
