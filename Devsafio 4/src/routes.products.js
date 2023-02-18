const ProductManager = require("./Product-Manager");
const express = require("express");
const router = express.Router();

const Manager = new ProductManager();

router.get("/products", (req, res) => {
  let { limit } = req.query;

  if (limit == undefined) {
    const data = Manager.getProducts();
    let products = JSON.parse(data);
    res.send(products);
  }
  if (limit) {
    limit = parseInt(limit);
    const data = Manager.getProducts(limit);
    let products = JSON.parse(data);
    res.send(products);
  }
});

router.get("/products/:pid", (req, res) => {
  let id = parseInt(req.params.pid);

  if (id != undefined) {
    const data = Manager.getProductById(id);
    let result = JSON.parse(data);
    res.send(result);
  }
});

router.delete("/products/:id", (req, res) => {
  let id = parseInt(req.params.pid);

  if (id != undefined) {
    const data = Manager.getProductById(id);
    let result = JSON.parse(data);
    res.send(result);
  }
});

module.exports = router;
