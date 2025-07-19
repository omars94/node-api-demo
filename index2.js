const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3000;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
require("dotenv").config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Mongo connected"))
  .catch((err) => console.error(err));
// Middleware
app.use(express.json());
app.use(cors());

// Routes
const productRoutes = require("./routes/products");
const userRoutes = require("./routes/users");
const UserModel = require("./UserModel");
app.use("/products", productRoutes);
app.use("/users", userRoutes);
// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

app.post("/register", async (req, res) => {
  const { email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  const user = await new UserModel({ email, password: hashed }).save();
  res.json(user);
});

app.post("/login", async (req, res) => {
  const user = await UserModel.findOne({ email: req.body.email });
  const match = bcrypt.compare(req.body.password, user.password);
  if (!match) return res.status(401).json({ error: "Invalid login" });

  const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
    expiresIn: "24h",
  });
  console.log(token);
  res.json({ token });
});
