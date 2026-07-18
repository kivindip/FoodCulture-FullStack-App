const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  country: { type: String, required: true },
  image: { type: String, default: "" },
  ingredients: { type: String, required: true },
  instructions: { type: String, required: true },
  cookingTime: { type: String },
}, { timestamps: true });

module.exports = mongoose.model("Recipe", recipeSchema);