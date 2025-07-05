const express = require("express");
const cors = require("cors");
const {
  addProduct,
  deleteProduct,
  updateProduct,
  getProduct,
} = require("./functions");
const app = express();
const PORT = 3001;

// Middleware to parse JSON body
app.use(express.json());
app.use(cors());

// Sample product data

let products = require("./products.json");

// GET all products
app.get("/products", (req, res) => {
  res.json(products);
});

// GET product by ID
app.get("/products/:id", getProduct);

// POST new product
app.post("/products", addProduct);

// PUT (update) a product
app.put("/products/:id", updateProduct);

// DELETE a product
app.delete("/products/:id", deleteProduct);

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
