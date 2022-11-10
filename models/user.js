const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  cart: {
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, required: true },
      },
    ],
  },
});

userSchema.methods.addToCart = function (product) {
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
      productId: product._id,
      quantity: newQuanity,
    });
  }
  const updatedCart = {
    items: [...updatedCartItems],
  };
  this.cart = updatedCart;
  return this.save();
};
module.exports = mongoose.model("User", userSchema);
/** const mongodb = require("mongodb");
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

  getCart() {
    const productIds = this.cart.items.map((e) => {
      return e.productId;
    });

    const db = getDb();
    return db
      .collection("products")
      .find({ _id: { $in: productIds } })
      .toArray()
      .then((products) => {
        return products.map((p) => {
          return {
            ...p,
            quantity: this.cart.items.find((e) => {
              return e.productId.toString() === p._id.toString();
            })["quantity"],
          };
        });
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

  deleteCartById(pId) {
    const updatedCart = this.cart.items.filter((e) => {
      return e.productId.toString() !== pId.toString();
    });
    const db = getDb();
    return db
      .collection("users")
      .updateOne(
        { _id: new ObjectId(this._id) },
        {
          $set: { cart: { items: updatedCart } },
        }
      )
      .then((_) => {
        console.log("DeleteCartItem SUCCESS");
      })
      .catch((err) => console.log(err));
  }

  addOrder() {
    const db = getDb();
    return this.getCart()
      .then((products) => {
        const order = {
          items: products,
          user: {
            _id: new ObjectId(this._id),
            name: this.name,
          },
        };
        return db.collection("orders").insertOne(order);
      })
      .then((_) => {
        this.cart = { items: [] };
        return db.collection("users").updateOne(
          { _id: new ObjectId(this._id) },
          {
            $set: { cart: { items: [] } },
          }
        );
      });
  }

  getOrders() {
    const db = getDb();
    return db
      .collection("orders")
      .find({ "user._id": new ObjectId(this._id) })
      .toArray();
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
*/
