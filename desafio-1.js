class ProductManager {
  constructor(products) {
    this.products = [];
  }

  getProducts() {
    console.log(this.products);
  }

  addProduct = ({ title, description, price, thumbnail, code, stock }) => {
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      return "Please check again that you provided all the information";
    }

    let toAdd;
    const id = this.products.length;

    const existingCode = this.products.some((el) => el.code === code);

    existingCode
      ? console.log(
          "This product's code has already been setted, please change the item's code"
        )
      : (toAdd = { id, title, description, price, thumbnail, code, stock });

    this.products.push(toAdd);
  };

  getProductById = (id) => {
    try {
      let productById = this.products.find((el) => el.id === id);
      console.log(productById);
    } catch (error) {
      console.log("Not Found");
    }
  };
}
// Instance Creation
Manager = new ProductManager();

// Get Empty Array
console.log("first get product");
Manager.getProducts();

// Set first example Array
console.log("First add product");
Manager.addProduct({
  title: "Producto de prueba",
  description: "Este es un producto de prueba",
  price: 200,
  thumbnail: "Sin Imagen",
  code: "abc123",
  stock: 25,
});

// Second get example Array
console.log("Second get product");
Manager.getProducts();

// Set second example Array
console.log("Second product add:");
Manager.addProduct({
  title: "Producto de prueba",
  description: "Este es un producto de prueba",
  price: 200,
  thumbnail: "Sin Imagen",
  code: "abc123",
  stock: 25,
});

// Get By ID
console.log("Get product By ID");
Manager.getProductById(0);
