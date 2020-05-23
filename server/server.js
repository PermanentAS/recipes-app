const express = require("express");
const config = require("config");
const mongoose = require("mongoose");

const app = express();
const PORT = config.get("port") || 3001;

app.use(express.json({ extended: true }));

app.use("/api/recipes", require("./routes/recipes.routes"));

const start = async () => {
  try {
    await mongoose.connect(config.get("mongoURI"), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    app.listen(PORT, () => console.log(`Server started on port ${PORT}...`));
  } catch (e) {
    console.log("server error", e.message);
    process.exit(1);
  }
};

start();
