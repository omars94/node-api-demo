const express = require("express");
const User = require("../UserModel");
const router = express.Router();

// Create
router.post("/", async (req, res) => {
  try {
    const newUser = new User(req.body);
    const saved = await newUser.save();
    res.status(201).json(saved);
  } catch (e) {
    res.status(400).json("Error");
    console.log(e);
  }
});

// Read all
router.get("/", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// Update
router.put("/:id", async (req, res) => {
  const updated = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updated);
});

// Delete
router.delete("/:id", async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "User deleted" });
});

module.exports = router;
