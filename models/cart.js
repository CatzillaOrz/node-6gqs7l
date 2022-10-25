const fs = require('fs');
const path = require('path');
const p = path.join(process.mainModule.path,
    'data',
    'cart.json'
)

module.exports = class Cart {
    static addProduct(id, productPrice) {
        fs.readFile(p, (err, data) => {
            let cart = {products: [], totalPrice: 0}
            if (!err) {
                cart = JSON.parse(data)
            }
            const existProductIndex = cart.products.findIndex(prod => prod.id === id)
            const existProduct = cart.products[existProductIndex];
            let updateProduct;
            if (existProduct) {
                updateProduct = {...existProduct}
                updateProduct.qty = updateProduct.qty + 1;
                cart.products[existProductIndex] = updateProduct;
            } else {
                updateProduct = {id: id, qty: 1}
                cart.products = [...cart.products, updateProduct]
            }
            cart.totalPrice = cart.totalPrice + productPrice;
            fs.writeFile(p, JSON.stringify(cart), (err) => {
                console.log(err)
            })
        })
    }
}
