const products = require("./products.json");
const Product = require("./ProductModel");
const ProductModel = require("./ProductModel");
const getProduct = (req, res) => {
  const product = products.find((p) => p.id == req.params.id);
  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }
  res.json(product);
};

const addProduct = async (req, res) => {
  //mongodb
  const product = new Product(req.body);
  res.status(201).json(await product.save());
  return;
  const { title, price, description } = req.body;

  products.forEach((i) => JSON.stringify(i) == JSON.stringify(req.body));
  // Basic validation
  if (!title || title.trim() === "") {
    console.log("title incorrect");
    return res.status(400).json({ error: "Product title is required" });
  }
  if (!description || description.trim() === "") {
    console.log("description incorrect");
    return res.status(400).json({ error: "Product description is required" });
  }
  if (price === undefined || typeof price !== "number") {
    console.log("price incorrect");
    return res.status(400).json({ error: "Valid product price is required" });
  }
  console.log(" added product");
  const newProduct = { ...req.body, id: Date.now(), title, price, description };
  products.push(newProduct);
  res.status(201).json(newProduct);
};
const updateProduct = async (req, res) => {
  const updated = await ProductModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
  return;
  const product = products.find((p) => p.id == req.params.id);
  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }

  const { name, price } = req.body;
  if (name && name.trim() !== "") product.name = name;
  if (price !== undefined && typeof price === "number") product.price = price;

  res.json(product);
};
const deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
  return;
  const initialLength = products.length;
  products = products.filter((p) => p.id != req.params.id);

  if (products.length === initialLength) {
    return res.status(404).json({ error: "Product not found" });
  }

  res.status(204).send();
};
module.exports = { deleteProduct, getProduct, addProduct, updateProduct };
