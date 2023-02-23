const ProductManager = require("./Product-Manager");
const express = require("express");
const router = express.Router();

router.post("carts", (req, res) => {});

router.get("carts/:cid", (req, res) => {});

router.post("carts/:cid/product/:pid", (req, res) => {});

module.exports = router;
