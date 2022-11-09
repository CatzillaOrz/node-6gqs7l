const express = require("express");
const router = express.Router();

const shopController = require("../controllers/shop");

/**
router.get("/", shopController.getIndex);
router.get("/products", shopController.getProducts);
router.get("/cart", shopController.getCart);
router.get("/orders", shopController.getOrders);
router.post("/create-order", shopController.postOrder);
router.get("/products/:id", shopController.getDetail);
router.post("/cart", shopController.postCart);
router.post("/cart-delete-item", shopController.deleteCartById);
router.delete("/products/delete/:id", shopController.deleteProduct);
router.get("/checkout", shopController.getCheckout);
*/
module.exports = router;
