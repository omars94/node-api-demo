const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  title: String,
  price: Number,
  images: Array,
  description: String,
});

module.exports = mongoose.model("Product", productSchema);
