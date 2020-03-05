const { Schema, model } = require("mongoose");

const schema = new Schema({
  recipeId: { type: String, required: true },
  title: { type: String, required: true },
  text: { type: String, required: true },
  date: { type: Date, required: true }
});

module.exports = model("RecipeHistory", schema);
