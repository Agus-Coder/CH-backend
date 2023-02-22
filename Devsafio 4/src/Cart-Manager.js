const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "carts.json");

class Cart {
  static id = Math.floor(Math.random() * 1000000);
  constructor(products = []) {
    (this.id = this.id), (this.products = products);
    this.path;
  }
}

class CartManager {
  constructor(path) {
    (this.carts = []), this.path;
  }

  static idCounter = 3;

  createCart(products = []) {
    const data = fs.readFileSync(filePath);
    const carts = JSON.parse(data);
    this.carts = carts;

    if (products == []) {
      console.log("productos vacios");
      const newCart = new Cart();
      const existingId = this.carts.some((el) => el.id === newCart.id);
      existingId ? this.createCart(products) : this.carts.push(newCart);
      const toSave = JSON.stringify(this.carts);
      fs.writeFileSync(filePath, toSave);
      console.log("File writed sucefully");
    }
    if (products.length != 0) {
      console.log("productos no vacios");

      const newCart = new Cart(products);
      const existingId = this.carts.some((el) => el.id === newCart.id);
      existingId ? this.createCart(products) : this.carts.push(newCart);
      const toSave = JSON.stringify(this.carts);
      fs.writeFileSync(filePath, toSave);
      console.log("File writed sucefully");
    }
  }
}

const cartManagement = new CartManager();

cartManagement.createCart([{ test: "test" }, { test: "otro test" }]);
