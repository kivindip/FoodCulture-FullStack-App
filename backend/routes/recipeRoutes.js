const express = require("express");
const router = express.Router();
const Recipe = require("../models/Recipe");
const authMiddleware = require("../middleware/authMiddleware");


// ================= CREATE (PROTECTED) =================
router.post("/", authMiddleware, async (req, res) => {
  try {
    const recipe = await Recipe.create(req.body);
    res.json(recipe);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ================= GET ALL (PUBLIC) =================
router.get("/", async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ================= DELETE (PROTECTED) =================
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    await Recipe.findByIdAndDelete(req.params.id);
    res.json({ message: "Recipe deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;