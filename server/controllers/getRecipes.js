const Recipe = require("../models/Recipe");

exports.getRecipes = async (req, res) => {
  try {
    const resp = await Recipe.find().sort({ date: -1 });
    return res.status(200).json(resp);
  } catch (e) {
    res
      .status(500)
      .json({ message: "Something went wrong...", error: e.message });
  }
};
