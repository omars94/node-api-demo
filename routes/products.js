const express = require("express");
const router = express.Router();

let products = require("../products.json");
const {
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
} = require("../functions");
const ProductModel = require("../ProductModel");

// GET all products
router.get("/", async (req, res) => {
  res.json(await ProductModel.find());
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
