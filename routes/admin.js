const path = require("path");
const express = require("express");
const rootDir = require("../util/path");

const adminController = require("../controllers/admin");

const router = express.Router();

router.get("/add-product", adminController.getAddProduct);
router.get("/products", adminController.getProduct);

router.post("/add-product", adminController.postAddProduct);
router.get("/edit-product/:id", adminController.getEditProduct);

exports.routes = router;
