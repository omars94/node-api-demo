const products = require("./products.json");

export const getProduct = (req, res) => {
  const product = products.find((p) => p.id == req.params.id);
  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }
  res.json(product);
};

export const addProduct = (req, res) => {
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
export const updateProduct = (req, res) => {
  const product = products.find((p) => p.id == req.params.id);
  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }

  const { name, price } = req.body;
  if (name && name.trim() !== "") product.name = name;
  if (price !== undefined && typeof price === "number") product.price = price;

  res.json(product);
};
export const deleteProduct = (req, res) => {
  const initialLength = products.length;
  products = products.filter((p) => p.id != req.params.id);

  if (products.length === initialLength) {
    return res.status(404).json({ error: "Product not found" });
  }

  res.status(204).send();
};
