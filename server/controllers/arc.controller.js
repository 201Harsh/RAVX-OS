const ArcLabModel = require("../models/ArcLab.model");
const UserModel = require("../models/user.model");
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

    const user = await UserModel.findById(UserId);

    if (!user) {
      return res.status(404).json({
        message: "User not found.",
      });
    }

    if (user.LabTokens <= 0) {
      return res.status(400).json({
        message: "You have no lab tokens left.",
      });
    }

    const ArcLab = await ArcLabServices.CreateArcLab({
      name,
      UserId,
    });

    user.LabTokens -= 1;
    await user.save();

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

module.exports.GetArcLab = async (req, res) => {
  try {
    const UserId = req.user._id;

    const ArcLab = await ArcLabModel.find({ UserId });

    res.status(200).json({
      message: "ArcLab Fetched Successfully!",
      ArcLab,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
