const { Router } = require("express");
const { check, validationResult } = require("express-validator");
const moment = require("moment");
const Recipe = require("../models/Recipe");
const RecipeHistory = require("../models/RecipeHistory");
const router = Router();

router.get("/", async (req, res) => {
  try {
    const { _id } = req.query;

    if (!_id) {
      const resp = await Recipe.find().sort({ date: -1 });
      return res.status(200).json(resp);
    }

    const recipe = await Recipe.findOne({ _id: _id });
    const history = await RecipeHistory.find({ recipeId: _id });
    const resp = { recipe, history };
    return res.status(200).json(resp);
  } catch (e) {
    res
      .status(500)
      .json({ message: "Something went wrong...", error: e.message });
  }
});

router.post(
  "/add",
  [
    check("title", "Minimum title length 3 characters.").isLength({
      min: 3
    }),
    check("text", "Minimum text length 3 characters.").isLength({
      min: 3
    })
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Incorrect data when adding / updating a recipe."
        });
      }

      const { title, text } = req.body;
      const { _id } = req.query;
      const date = moment();

      if (_id) {
        const candidate = await Recipe.findOne({ _id });
        if (!candidate) {
          return res.status(400).json({ message: "There is no such recipe." });
        }

        if (candidate.title === title && candidate.text === text) {
          return res
            .status(400)
            .json({ message: "There are nothing to change" });
        }

        const recipeToHistory = new RecipeHistory({
          recipeId: candidate._id,
          title: candidate.title,
          text: candidate.text,
          date: candidate.date
        });

        await candidate.updateOne({
          $set: { title, text, date }
        });

        await recipeToHistory.save();

        return res.status(201).json({ message: "Recipe updated." });
      }

      const candidate = await Recipe.findOne({ title });

      if (candidate) {
        return res.status(400).json({ message: "Recipe already exists." });
      }

      const recipe = new Recipe({ title, text, date });

      await recipe.save();

      return res.status(201).json({ message: "Recipe created." });
    } catch (e) {
      res
        .status(500)
        .json({ message: "Something went wrong...", error: e.message });
    }
  }
);

router.delete("/delete", async (req, res) => {
  try {
    const _id = req.query._id;

    await Recipe.deleteOne({ _id });
    await RecipeHistory.deleteMany({ recipeId: _id });

    res.status(200).json({ message: "Recipe deleted." });
  } catch (e) {
    res
      .status(500)
      .json({ message: "Something went wrong...", error: e.message });
  }
});

module.exports = router;
