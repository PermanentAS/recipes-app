const Recipe = require("../models/Recipe");
const RecipeHistory = require("../models/RecipeHistory");

exports.getRecipe = async (req, res) => {
  try {
    const { _id } = req.params;
    const recipe = await Recipe.findOne({ _id: _id });
    const history = await RecipeHistory.find({
      recipeId: _id,
    });
    const resp = { recipe, history };
    return res.status(200).json(resp);
  } catch (e) {
    res
      .status(500)
      .json({ message: "Something went wrong...", error: e.message });
  }
};
