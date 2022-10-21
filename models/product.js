const fs = require("fs");
const path = require("path");
module.exports = class Product {
  constructor(title) {
    this.title = title;
  }

  save() {
    const p = path.join(
      path.dirname(process.mainModule.filename),
      "data",
      "products.json"
    );
    fs.readFile(p, (err, fileContent) => {
      console.log("h1");
    });
  }

  static fetchAll() {
    return products;
  }
};
