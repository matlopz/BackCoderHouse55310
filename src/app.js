
const express = require('express');
const ProductManager = require('./products/ProductManager');

const app = express();
const productManager = new ProductManager('src/file/products.json');

app.use(express.json());

// Endpoint obtener los productos
app.get('/products', async (req, res) => {
  const limit = parseInt(req.query.limit);
  const products = await productManager.getProducts();
  
  if (Number.isInteger(limit)) {
    res.json(products.slice(0, limit));
  } else {
    res.json(products);
  }
});

// Endpoint buscar producto por id
app.get('/products/:pid', async (req, res) => {
  const productId = parseInt(req.params.pid);
  const product = await productManager.getProductById(productId);
  
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: 'Producto no encontrado' });
  }
});

//Servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});