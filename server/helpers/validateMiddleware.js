const { validationResult } = require("express-validator");

exports.validateMiddleware = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
      message: "Incorrect data when adding / updating recipe.",
    });
  }

  next();
};
