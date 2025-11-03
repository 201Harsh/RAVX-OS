const AIAgentModel = require("../models/AIAgent.model");
const UserModel = require("../models/user.model");
const ArcLabModel = require("../models/ArcLab.model");

module.exports.CreateAIAgent = async ({
  name,
  gender,
  voice,
  personality,
  avatar,
  description,
  tone,
  behaviors,
  skills,
  UserId,
  id,
}) => {
  if (
    !name ||
    !gender ||
    !voice ||
    !personality ||
    !avatar ||
    !description ||
    !tone ||
    !behaviors ||
    !skills ||
    !UserId ||
    !id
  ) {
    throw new Error("All fields are required for creating a AIAgent.");
  }

  const User = await UserModel.findById(UserId);

  if (!User) {
    throw new Error("User not found.");
  }

  const ArcLab = await ArcLabModel.findById(id);

  if (!ArcLab) {
    throw new Error("ArcLab not found.");
  }

  const AIAgent = await AIAgentModel.create({
    name,
    gender,
    voice,
    personality,
    avatar,
    description,
    tone,
    behaviors,
    skills,
    UserId,
    ArcLabId: ArcLab._id,
  });
  return AIAgent;
};
