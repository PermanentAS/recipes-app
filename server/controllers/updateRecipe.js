const Recipe = require("../models/Recipe");
const RecipeHistory = require("../models/RecipeHistory");
const moment = require("moment");

exports.updateRecipe = async (req, res) => {
  try {
    const { _id } = req.params;
    const { title, text } = req.body;
    const date = moment();

    if (!_id) {
      return res.status(400).json({ message: "Bad request." });
    }

    const candidate = await Recipe.findOne({ _id });

    if (!candidate) {
      return res.status(400).json({ message: "There is no such recipe." });
    }

    if (candidate.title === title && candidate.text === text) {
      return res.status(400).json({ message: "There are nothing to change." });
    }

    const recipeToHistory = new RecipeHistory({
      recipeId: candidate._id,
      title: candidate.title,
      text: candidate.text,
      date: candidate.date,
    });

    await candidate.updateOne({
      $set: { title, text, date },
    });

    await recipeToHistory.save();

    return res.status(201).json({ message: "Recipe updated." });
  } catch (e) {
    res
      .status(500)
      .json({ message: "Something went wrong...", error: e.message });
  }
};
