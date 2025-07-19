const express = require("express");
const router = express.Router();

let products = require("../products.json");
const {
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
  auth,
} = require("../functions");
const ProductModel = require("../ProductModel");

// GET all products
router.get("/", auth, async (req, res) => {
  res.json(await ProductModel.find());
});
// GET product by ID
router.get("/:id", auth, getProduct);

// POST new product
router.post("/", auth, addProduct);

// PUT update product
router.put("/:id", auth, updateProduct);

// DELETE product
router.delete("/:id", auth, deleteProduct);

module.exports = router;
