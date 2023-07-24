const fs = require('fs/promises');

class ProductManager {
  constructor(path) {
    this.path = path;
  }

  async addProduct(product) {
    const products = await this.getProducts();
    const newProduct = { ...product, id: products.length + 1 };
    products.push(newProduct);
    await this.saveProducts(products);
    console.log("Producto agregado exitosamente.");
  }

  async getProducts() {
    try {
      const data = await fs.readFile(this.path, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      console.error("Error al leer el archivo de productos:", error);
      return [];
    }
  }

  async getProductById(id) {
    const products = await this.getProducts();
    const product = products.find(product => product.id === id);

    if (product) {
      return product;
    } else {
      console.log("Producto no encontrado.");
      return null;
    }
  }

  async updateProduct(id, updatedFields) {
    const products = await this.getProducts();
    const productIndex = products.findIndex(product => product.id === id);

    if (productIndex !== -1) {
      const updatedProduct = { ...products[productIndex], ...updatedFields };
      products[productIndex] = updatedProduct;
      await this.saveProducts(products);
      console.log("Producto actualizado exitosamente.");
    } else {
      console.log("Producto no encontrado.");
    }
  }

  async deleteProduct(id) {
    const products = await this.getProducts();
    const updatedProducts = products.filter(product => product.id !== id);

    if (updatedProducts.length !== products.length) {
      await this.saveProducts(updatedProducts);
      console.log("Producto eliminado exitosamente.");
    } else {
      console.log("Producto no encontrado.");
    }
  }

  async saveProducts(products) {
    try {
      const data = JSON.stringify(products, null, 2);
      await fs.writeFile(this.path, data, 'utf8');
    } catch (error) {
      console.error("Error al guardar los productos:", error);
    }
  }
}
module.exports = ProductManager