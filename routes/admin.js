const path = require("path");
const express = require("express");
const rootDir = require("../util/path");

const adminController = require("../controllers/admin");

const router = express.Router();

router.get("/add-product", adminController.getAddProduct);
router.get("/products", adminController.getAddProduct);

router.post("/add-product", adminController.postAddProduct);

exports.routes = router;
