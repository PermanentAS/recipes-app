const { Schema, model } = require("mongoose");

const schema = new Schema({
  title: { type: String, required: true },
  text: { type: String, required: true },
  date: { type: Date, required: true }
});

module.exports = model("Recipe", schema);
