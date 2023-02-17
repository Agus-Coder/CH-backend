const ProductManager = require("./Product-Manager");
const express = require("express");
const app = express();
const port = 8080;

const Manager = new ProductManager();

app.use(express.urlencoded({ extended: true }));

app.get("/products", (req, res) => {
  let { limit } = req.query;

  if (limit == undefined) {
    const data = Manager.getProducts();
    let products = JSON.parse(data);
    res.send(products);
  }
  if (limit) {
    limit = parseInt(limit)
    const data = Manager.getProducts(limit);
    let products = JSON.parse(data);
    res.send(products); 
  }
});

app.get("/products/:pid", (req, res) => {
  let id = parseInt(req.params.pid);

  if (id != undefined) {
    const data = Manager.getProductById(id);
    let result = JSON.parse(data);
    res.send(result);
  }
});

app.listen(port, () => {
  console.log(`Server mounted on port ${port}!`);
});

// console.log(Manager.getProducts());
