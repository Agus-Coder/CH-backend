const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "products.json");

class ProductManager {
  constructor(path) {
    (this.products = []), this.path;
  }

  static counter = 2;

  getProducts(limit = 0) {
    const data = fs.readFileSync(filePath); // no lo pude hacer funcionar asincrono!

    if (limit != 0) {
      const products = JSON.parse(data);
      this.products = products;
      let reducedProducts = products.slice(0, limit);
      const returnProducts = JSON.stringify(reducedProducts);
      return returnProducts;
    }
    return data;
  }

  addProduct({
    title,
    description,
    price,
    thumbnail,
    code,
    stock,
    category,
    status,
  }) {
    const data = fs.readFileSync(filePath, "utf-8");

    const products = JSON.parse(data);
    this.products = products;

    if (
      !title ||
      !description ||
      !price ||
      !thumbnail ||
      !code ||
      !stock ||
      !category
    ) {
      return "Please check again that you provided all the information";
    }
    let toAdd;
    const id = this.products.length + ProductManager.counter;

    const existingCode = this.products.some((el) => el.code === code);

    if (existingCode) {
      console.log(
        "This product's code has already been setted, please change the item's code"
      );
    }

    if (!existingCode) {
      ProductManager.counter += 1 + Math.floor(Math.random() * 10);

      toAdd = {
        id,
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
        category,
        status: true,
      };

      this.products.push(toAdd);
      console.log("New product added");

      const toSave = JSON.stringify(this.products);

      fs.writeFileSync(filePath, toSave);
      console.log("File writed sucefully");
    }
  }

  updateProduct = ({ propertyToModify, newPropertyValue, id }) => {
    const data = fs.readFileSync(filePath, "utf-8");

    const toModify = { propertyToModify, newPropertyValue, id }

    const products = JSON.parse(data);
    this.products = products;
    const trueID = toModify.id;
    const trueToModify = toModify.propertyToModify;
    const trueNewValue = toModify.newPropertyValue;
    console.log(typeof trueToModify);


    const itm = this.products.findIndex((el) => el.id == trueID);

    this.products[itm][trueToModify] = trueNewValue; // estoy pasando un string en true modify y eso provoca ue la notacion bracket no funciones

    const toSave = JSON.stringify(this.products);

    fs.writeFileSync(filePath, toSave);

    console.log("Item modified successfully");
  };

  getProductById = (id) => {
    const data = fs.readFileSync(filePath);
    const products = JSON.parse(data);
    this.products = products;

    let productById = this.products.find((el) => el.id === id);

    if (productById == undefined) {
      console.log("Not found");
      let result = "Not Found";
      return result;
    } else if (productById != undefined) {
      const result = JSON.stringify(productById);
      return result;
    }
  };

  deleteProduct = (id) => {
    const data = fs.readFileSync(filePath, "utf-8");

    const products = JSON.parse(data);
    this.products = products;

    const itm = this.products.findIndex((el) => el.id == id);

    if (itm) {
      this.products.splice(itm, 1);
      const toSave = JSON.stringify(this.products);
      fs.writeFileSync(filePath, toSave);
      console.log("Item deleted successfully");
    }

    if (!itm) console.log("There is no such item!");
  };
}

module.exports = ProductManager;
