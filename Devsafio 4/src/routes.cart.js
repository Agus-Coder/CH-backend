const ProductManager = require("./Product-Manager");
const express = require("express");
const router = express.Router();

router.post("carts");
router.get("carts/:cid");
router.post("carts/:cid/product/:pid");


module.exports = router;