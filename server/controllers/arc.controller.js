const ArcLabModel = require("../models/ArcLab.model");
const ArcLabServices = require("../services/arc.service");

module.exports.CreateArcLab = async (req, res) => {
  try {
    const { name } = req.body;
    const UserId = req.user._id;

    if (typeof name !== "string") {
      return res.status(406).json({
        message: "Invalid request parameters passed Only Strings Allowed!",
      });
    }

    const ArcLab = await ArcLabServices.CreateArcLab({
      name,
      UserId,
    });

    res.status(200).json({
      message: "ArcLab Created Successfully!",
      ArcLab,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
