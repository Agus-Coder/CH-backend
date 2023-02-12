const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "products.json");

class ProductManager {
  constructor(path) {
    (this.products = []), this.path;
  }

  static counter = 2;

  getProducts() {
    fs.readFile(filePath, "utf-8", (err, data) => {
      if (err) throw err;
      console.log(JSON.parse(data));
    });
  }

  addProduct({ title, description, price, thumbnail, code, stock }) {
    fs.readFile(filePath, "utf-8", (err, data) => {
      if (err) throw err;

      const products = JSON.parse(data);
      this.products = products;

      if (!title || !description || !price || !thumbnail || !code || !stock) {
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

        toAdd = { id, title, description, price, thumbnail, code, stock };

        this.products.push(toAdd);
        console.log("New product added");

        const toSave = JSON.stringify(this.products);

        fs.writeFile(filePath, toSave, (err) => {
          if (err) console.log(err);
          else {
            console.log("File written successfully");
          }
        });
      }
    });
  }

  updateProduct = (id, propertyToModify, newPropertyValue) => {
    fs.readFile(filePath, "utf-8", (err, data) => {
      if (err) throw err;

      const products = JSON.parse(data);
      this.products = products;

      const itm = this.products.findIndex((el) => el.id == id);

      this.products[itm][propertyToModify] = newPropertyValue;

      const toSave = JSON.stringify(this.products);

      fs.writeFile(filePath, toSave, (err) => {
        if (err) console.log(err);
        else {
          console.log("Item modified successfully");
        }
      });
    });
  };

  getProductById = (id) => {
    fs.readFile(filePath, "utf-8", (err, data) => {
      if (err) throw err;

      const products = JSON.parse(data);
      this.products = products;

      let productById = this.products.find((el) => el.id === id);

      if (productById == undefined) {
        console.log("Not Found");
      }
      if (productById != undefined) {
        console.log(productById);
      }
    });
  };

  deleteProduct = (id) => {
    fs.readFile(filePath, "utf-8", (err, data) => {
      if (err) throw err;

      const products = JSON.parse(data);
      this.products = products;

      const itm = this.products.findIndex((el) => el.id == id);

      if (itm) {
        this.products.splice(itm, 1);
        const toSave = JSON.stringify(this.products);
        fs.writeFile(filePath, toSave, (err) => {
          if (err) console.log(err);
          else {
            console.log("Item deleted successfully");
          }
        });
      }
      if(!itm) console.log('There is no such item!');
    });
  };
}

Manager = new ProductManager("products2.json");

// Get Empty Array
console.log("first get product");
Manager.getProducts();

// Set first example Array
// console.log("First add product");
// Manager.addProduct({
//   title: "Producto de prueba, nuevamente",
//   description: "Este es un producto de prueba, sin antecedentes",
//   price: 200,
//   thumbnail: "Sin Imagen",
//   code: "abc3",
//   stock: 25,
// });
// Manager.addProduct({
//   title: "Producto de prueba 2",
//   description: "Este es otro producto de prueba",
//   price: 2030,
//   thumbnail: "Sin Imagen",
//   code: "az4356",
//   stock: 40,
// });

console.log("Get product By ID");
Manager.getProductById(4);

// Manager.updateProduct(4,"title","titulo modificado");

Manager.deleteProduct(10);
