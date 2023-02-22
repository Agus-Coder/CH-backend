const ProductManager = require("./Product-Manager");
const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: true }));
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

router.post("/products", (req, res) => {
  const {
    title,
    description,
    price,
    thumbnail,
    code,
    stock,
    category,
    status,
  } = req.body;

  Manager.addProduct(req.body);
  res.send("Product added successfully");
});

router.put("/products/:pid", (req, res) => {
  const id = parseInt(req.params.pid);

  req.body.id = id;
  const { propertyToModify, newPropertyValue } = req.body;

  console.log(req.body);
  console.log(req.body.propertyToModify);
  console.log(req.body.newPropertyValue);

  if (id != undefined) {
    Manager.updateProduct(req.body);
    res.send("Product property updated successfully");
  }

  if (id == undefined) {
    res.send("No product ID was specified");
  }
});

router.delete("/products/:pid", (req, res) => {
  const id = parseInt(req.params.pid);

  if (id != undefined) {
    Manager.deleteProduct(id);
    res.send("Selected product was deleted");
  }

  if (id == undefined) {
    res.send("No product ID was specified");
  }
});

module.exports = router;
