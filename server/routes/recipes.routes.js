const { Router } = require("express");
const { check } = require("express-validator");
const Recipe = require("../models/Recipe");
const RecipeHistory = require("../models/RecipeHistory");
const router = Router();

const { validateMiddleware } = require("../helpers/validateMiddleware");

const { getRecipe } = require("../controllers/getRecipe");
const { getRecipes } = require("../controllers/getRecipes");
const { createRecipe } = require("../controllers/createRecipe");
const { updateRecipe } = require("../controllers/updateRecipe");
const { deleteRecipe } = require("../controllers/deleteRecipe");

router.get("/", getRecipes);

router.get("/:_id", getRecipe);

router.post(
  "/add",
  [
    check("title", "Minimum title length 3 characters.").isLength({
      min: 3,
    }),
    check("text", "Minimum text length 3 characters.").isLength({
      min: 3,
    }),
  ],
  validateMiddleware,
  createRecipe
);

router.put(
  "/update/:_id",
  [
    check("title", "Minimum title length 3 characters.").isLength({
      min: 3,
    }),
    check("text", "Minimum text length 3 characters.").isLength({
      min: 3,
    }),
  ],
  validateMiddleware,
  updateRecipe
);

router.delete("/delete/:_id", deleteRecipe);

module.exports = router;
