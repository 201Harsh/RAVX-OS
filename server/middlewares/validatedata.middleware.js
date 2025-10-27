const { validationResult } = require("express-validator");

module.exports.ValidateData = (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      console.log(errors)
      return res.status(400).json({
        message: errors.array(),
      });
    }
    next();
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
