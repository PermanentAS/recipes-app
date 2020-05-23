const Recipe = require("../models/Recipe");
const moment = require("moment");

exports.createRecipe = async (req, res) => {
  try {
    const { title, text } = req.body;
    const date = moment();

    const candidate = await Recipe.findOne({ title });

    if (candidate) {
      return res
        .status(400)
        .json({ message: "Recipe with this name already exists." });
    }

    const recipe = new Recipe({ title, text, date });

    await recipe.save();

    return res.status(201).json({ message: "Recipe created." });
  } catch (e) {
    res
      .status(500)
      .json({ message: "Something went wrong...", error: e.message });
  }
};
