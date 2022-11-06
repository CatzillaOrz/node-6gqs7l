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
    .then((cart) => {
      return cart.getProducts();
    })
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
    .getCart()
    .then((cart) => {
      fetchedCart = cart;
      return cart.getProducts();
    })
    .then((products) => {
      return req.user.createOrder().then((order) => {
        return order.addProducts(
          products.map((e) => {
            e.orderItem = { qty: e.cartItem.qty };
            return e;
          })
        );
      });
    })
    .then((_) => {
      return fetchedCart.setProducts(null);
    })
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
  let fetchedCart;
  let newQuantity = 1;
  req.user
    .getCart()
    .then((cart) => {
      fetchedCart = cart;
      return cart.getProducts({ where: { id: pId } });
    })
    .then(([prod]) => {
      if (prod) {
        const oldQty = prod.cartItem.qty;
        newQuantity = oldQty + 1;
        return prod;
      }
      return Product.findByPk(pId);
    })
    .then((product) => {
      return fetchedCart.addProduct(product, {
        through: {
          qty: newQuantity,
        },
      });
    })
    .then((_) => res.redirect("/cart"))
    .catch((err) => console.log(err));
};

exports.deleteCartById = (req, res, next) => {
  const pId = req.body.id;
  req.user
    .getCart()
    .then((cart) => {
      return cart.getProducts({ where: { id: pId } });
    })
    .then(([product_index0]) => {
      return product_index0.cartItem.destroy();
    })
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
