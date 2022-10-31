const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getAddProduct = (req, res, next) => {
    res.render('admin/edit-product', {
        path: 'admin',
        pageTitle: 'Add-Product',
        activeProduct: true,
        productCss: true,
    });
};

exports.postAddProduct = (req, res, next) => {
    const product = new Product(req.body.title);
    product.save();
    res.redirect('/');
};

exports.getProducts = (req, res, next) => {
    Product.findAll()
        .then((products) => {
            res.render('shop/product-list', {
                prods: products,
                pageTitle: 'All Products',
                path: '/products',
            });
        })
        .catch((err) => {
            console.log(err);
        });
};

exports.getIndex = (req, res, next) => {
    Product.findAll()
        .then((products) => {
            res.render('shop/index', {
                prods: products,
                pageTitle: 'Shop Index',
                path: '/',
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
            cart.getProducts()
                .then((products) => {
                    res.render('shop/cart', {
                        pageTitle: 'Shop Cart',
                        path: '/cart',
                        products: products,
                        cart: cart,
                    });
                })
                .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
};

exports.getOrders = (req, res, next) => {
    res.render('shop/orders', {
        pageTitle: 'Shop Orders',
        path: '/orders',
    });
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
    Product.findByPk(pId)
        .then((product) => {
            res.render('shop/product-detail', {
                product: product,
                path: '/products',
                pageTitle: 'Detail',
            });
        })
        .catch((err) => console.log(err));
};

exports.postCart = (req, res, next) => {
    const pId = req.body.id;
    Product.findById(pId, (product) => {
        Cart.addProduct(pId, product.price);
        res.redirect('/cart');
    });
};

exports.deleteCartById = (req, res, next) => {
    const pId = req.body.id;
    Product.findById(pId, (product) => {
        Cart.deleteProductById(pId, product.price);
        res.redirect('/cart');
    });
};

exports.deleteProduct = (req, res, next) => {
    res.render('shop/checkout', {
        path: '/checkout',
        pageTitle: 'Checkout',
    });
};

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        path: '/checkout',
        pageTitle: 'Checkout',
    });
};
