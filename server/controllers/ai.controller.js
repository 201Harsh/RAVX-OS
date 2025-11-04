const UserModel = require("../models/user.model");
const AIAgentModel = require("../models/AIAgent.model");
const AIAgentServices = require("../services/ai.service");
const ArcLabModel = require("../models/ArcLab.model");

module.exports.CreateAIAgent = async (req, res) => {
  try {
    const {
      name,
      gender,
      voice,
      personality,
      engineModel,
      description,
      tone,
      behaviors,
      skills,
    } = req.body;

    const UserId = req.user._id;
    const id = req.params.id;

    if (
      typeof name !== "string" ||
      typeof gender !== "string" ||
      typeof voice !== "string" ||
      typeof personality !== "string" ||
      typeof engineModel !== "string" ||
      typeof description !== "string" ||
      typeof tone !== "string"
    ) {
      return res.status(406).json({
        message: "Invalid request parameters passed Only Strings Allowed!",
      });
    }

    const user = await UserModel.findById(UserId);
    const ArcLab = await ArcLabModel.findById(id);

    if (!ArcLab) {
      return res.status(404).json({
        message: "ArcLab not found.",
      });
    }

    if (!user) {
      return res.status(404).json({
        message: "User not found.",
      });
    }

    if (ArcLab.UserId !== UserId) {
      return res.status(401).json({
        message: "you can't Create AI-Agent in this ArcLab!",
        message1: "Creator Your own ArcLab to Create AI-Agent.",
      });
    }

    const ifAIAgentExists = await AIAgentModel.findOne({
      name,
    });

    if (ifAIAgentExists) {
      return res.status(400).json({
        message:
          "AI-Agent with this name already exists. Please try again with a different name.",
      });
    }

    if (user.AIAgentToken <= 0) {
      return res.status(400).json({
        message: "You have no AI-Agent tokens left.",
      });
    }

    const AIAgent = await AIAgentServices.CreateAIAgent({
      name,
      gender,
      voice,
      personality,
      engineModel,
      description,
      tone,
      behaviors,
      skills,
      UserId,
      id,
    });

    user.AIAgentToken -= 1;
    await user.save();

    res.status(200).json({
      message: "AI-Agent Created Successfully!",
      AIAgent,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports.GetAIAgent = async (req, res) => {
  try {
    const UserId = req.user._id;
    const id = req.params.id;

    const ArcLab = await ArcLabModel.findById(id);
    const User = await UserModel.findById(UserId);

    if (!ArcLab) {
      return res.status(404).json({
        message: "ArcLab not found.",
      });
    }

    if (!User) {
      return res.status(404).json({
        message: "User not found.",
      });
    }

    if (ArcLab.UserId !== UserId) {
      return res.status(401).json({
        message: "you can't Get AI-Agent for this ArcLab!",
        message1: "Creator Your own ArcLab to Get AI-Agent.",
      });
    }

    const AIAgent = await AIAgentModel.find({
      UserId,
      ArcLabId: id,
    });

    res.status(200).json({
      message: "AI-Agent Fetched Successfully!.",
      AIAgent,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports.DeleteAIAgent = async (req, res) => {
  try {
    const id = req.params.id;
    const UserId = req.user._id;

    if (typeof id !== "string") {
      return res.status(406).json({
        message: "Invalid request parameters passed Only Strings Allowed!",
      });
    }

    if (!id) {
      return res.status(404).json({
        message: "AI-Agent not found.",
      });
    }

    const user = await UserModel.findById(UserId);

    if (!user) {
      return res.status(404).json({
        message: "User not found.",
      });
    }

    const AIAgent = await AIAgentModel.findById(id);

    if (!AIAgent) {
      return res.status(404).json({
        message: "AI-Agent not found.",
      });
    }

    if (AIAgent.UserId !== UserId) {
      return res.status(401).json({
        message: "Only Owner of AI-Agent can delete it.",
      });
    }
    await AIAgentModel.findByIdAndDelete(id);
    user.AIAgentToken += 1;
    await user.save();


    res.status(200).json({
      message: "AI-Agent Deleted Successfully!",
      AIAgent,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
