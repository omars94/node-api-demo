const express = require("express");
const router = express.Router();

let products = require("../products.json");
const {
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
} = require("../functions");

// GET all products
router.get("/", (req, res) => {
  res.json(products);
});
// GET product by ID
router.get("/:id", getProduct);

// POST new product
router.post("/", addProduct);

// PUT update product
router.put("/:id", updateProduct);

// DELETE product
router.delete("/:id", deleteProduct);

module.exports = router;
