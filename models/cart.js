const fs = require("fs");
const path = require("path");
const p = path.join(process.mainModule.path, "data", "cart.json");

module.exports = class Cart {
  static addProduct(id, productPrice) {
    fs.readFile(p, (err, data) => {
      let cart = { products: [], totalPrice: 0 };
      if (!err) {
        cart = JSON.parse(data);
      }
      const existProductIndex = cart.products.findIndex(
        (prod) => prod.id === id
      );
      const existProduct = cart.products[existProductIndex];
      let updateProduct;
      if (existProduct) {
        updateProduct = { ...existProduct };
        updateProduct.qty = updateProduct.qty + 1;
        cart.products[existProductIndex] = updateProduct;
      } else {
        updateProduct = { id: id, qty: 1 };
        cart.products = [...cart.products, updateProduct];
      }
      cart.totalPrice = cart.totalPrice + +productPrice;
      fs.writeFile(p, JSON.stringify(cart), (err) => {
        console.log(err);
      });
    });
  }

  static deleteProductById(id, price) {
    fs.readFile(p, (err, data) => {
      if (err) return;
      const cart = JSON.parse(data);
      const product = cart.products.find((e) => e.id === id);
      if (!product) return;
      const productQty = product.qty;
      cart.products = cart.products.filter((e) => e.id !== id);
      cart.totalPrice = cart.totalPrice - productQty * price;
      fs.writeFile(p, JSON.stringify(cart), (err) => {
        console.log(err);
      });
    });
  }

  static getCart(cb) {
    fs.readFile(p, (err, fileContent) => {
      const cart = JSON.parse(fileContent);
      cb(cart);
      if (err) cb(null);
    });
  }
};
