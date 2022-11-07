const mongodb = require("mongodb");
const getDb = require("../util/database").getDb;
const ObjectId = mongodb.ObjectId;

class User {
  constructor(username, email, cart, id) {
    this.name = username;
    this.email = email;
    this._id = id;
    this.cart = cart;
  }

  save() {
    const db = getDb();
    return db
      .collection("users")
      .insertOne(this)
      .then((_) => {
        console.log("Add User SUCCESS");
      })
      .catch((err) => console.log(err));
  }

  addToCart(product) {
    const findProdutIndex = this.cart
      ? this.cart.items.findIndex((e) => {
          return e.productId.toString() === product._id.toString();
        })
      : -1;
    let updatedCartItems = this.cart ? [...this.cart.items] : [];
    let newQuanity = 1;
    if (findProdutIndex >= 0) {
      newQuanity = this.cart.items[findProdutIndex].quantity + 1;
      updatedCartItems[findProdutIndex].quantity = newQuanity;
    } else {
      updatedCartItems.push({
        productId: new ObjectId(product._id),
        quantity: newQuanity,
      });
    }
    const updatedCart = {
      items: [...updatedCartItems],
    };
    const db = getDb();
    return db
      .collection("users")
      .updateOne(
        { _id: new ObjectId(this._id) },
        {
          $set: { cart: updatedCart },
        }
      )
      .then((_) => {
        console.log("AddToCart SUCCESS");
      })
      .catch((err) => console.log(err));
  }

  static findById(id) {
    const db = getDb();
    return db
      .collection("users")
      .findOne({ _id: new mongodb.ObjectId(id) })
      .then((user) => {
        return user;
      })
      .catch((err) => console.log(err));
  }
}
module.exports = User;
