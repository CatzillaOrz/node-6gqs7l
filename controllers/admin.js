const Product = require('../models/product');

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode) {
        return res.redirect('/');
    }
    const pId = req.params.id;
    req.user.getProducts({ where: { id: pId } }).then(([product]) => {
        if (!product) {
            return res.redirect('/');
        }
        res.render('admin/edit-product', {
            path: '/admin/edit-product',
            pageTitle: 'Edit-Product',
            editing: editMode,
            product: product,
        });
    });
};

exports.getAddProduct = (req, res, next) => {
    res.render('admin/edit-product', {
        path: '/admin/add-product',
        pageTitle: 'AddProducts',
        editing: false,
    });
};

exports.postEditProduct = (req, res, next) => {
    const prod = req.body;
    Product.findByPk(prod.id)
        .then((product) => {
            product.title = prod.title;
            product.price = prod.price;
            product.imageUrl = prod.imageUrl;
            product.description = prod.description;
            return product.save();
        })
        .then((_) => {
            console.log('UPDATE PRODUCT SUCCESS');
            res.redirect('/');
        })
        .catch((err) => {
            console.log(err);
        });
};

exports.deleteProduct = (req, res, next) => {
    const pId = req.body.id;
    console.log(pId);
    Product.findByPk(pId)
        .then((product) => {
            return product.destroy();
        })
        .then((_) => {
            res.redirect('/admin/products');
        })
        .catch((err) => {
            console.log(err);
        });
};

exports.getProduct = (req, res, next) => {
    Product.findAll().then((products) => {
        res.render('admin/products', {
            prods: products,
            path: '/admin/products',
            pageTitle: 'Products',
        });
    });
};
exports.postAddProduct = (req, res, next) => {
    console.log('req body:');
    console.log(req.body);
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const description = req.body.description;
    const price = req.body.price;
    req.user
        .createProduct({
            title: title,
            imageUrl: imageUrl,
            description: description,
            price: price,
        })
        .then((_) => {
            console.log('[mysql]:creaet product succeed!');
            res.redirect('/');
        })
        .catch((e) => console.log(e));
};
