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
  Product.fetchAll((products) => {});

  Product.fetchAll()
    .then(([rows, fieldData]) => {
      res.render("shop/product-list", {
        prods: rows,
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
    .then(([rows, fieldData]) => {
      res.render("shop/index", {
        prods: rows,
        pageTitle: "Shop Index",
        path: "/",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getCart = (req, res, next) => {
  Cart.getCart((cart) => {
    Product.fetchAll((products) => {
      const cartProduct = [];
      for (let product of products) {
        const cartProductData = cart.products.find(
          (prod) => prod.id === product.id
        );
        if (cartProductData) {
          cartProduct.push({
            productData: product,
            qty: cartProductData.qty,
          });
        }
      }
      res.render("shop/cart", {
        pageTitle: "Shop Cart",
        path: "/cart",
        products: cartProduct,
        cart: cart,
      });
    });
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
  Product.findById(pId)
    .then(([product]) => {
      res.render("shop/product-detail", {
        product: product[0],
        path: "/products",
        pageTitle: "Detail",
      });
    })
    .catch((err) => console.log(err));
};

exports.postCart = (req, res, next) => {
  const pId = req.body.id;
  Product.findById(pId, (product) => {
    Cart.addProduct(pId, product.price);
    res.redirect("/cart");
  });
};

exports.deleteCartById = (req, res, next) => {
  const pId = req.body.id;
  Product.findById(pId, (product) => {
    Cart.deleteProductById(pId, product.price);
    res.redirect("/cart");
  });
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
