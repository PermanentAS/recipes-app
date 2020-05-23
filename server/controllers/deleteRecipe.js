const Recipe = require("../models/Recipe");
const RecipeHistory = require("../models/RecipeHistory");

exports.deleteRecipe = async (req, res) => {
  try {
    const { _id } = req.params;

    await Recipe.deleteOne({ _id });
    await RecipeHistory.deleteMany({ recipeId: _id });

    res.status(200).json({ message: "Recipe deleted." });
  } catch (e) {
    res
      .status(500)
      .json({ message: "Something went wrong...", error: e.message });
  }
};
