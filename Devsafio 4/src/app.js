const ProductManager = require("./Product-Manager");
const express = require("express");
const app = express();
const port = 8080;

const Manager = new ProductManager();

const products = require('./routes.products')

app.use(express.urlencoded({ extended: true }));
app.use("/api",products)

app.listen(port, () => {
  console.log(`Server mounted on port ${port}!`);
});

// console.log(Manager.getProducts());
