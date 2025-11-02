const ArcLabModel = require("../models/ArcLab.model");

module.exports.CreateArcLab = async ({ name, UserId }) => {
  if (!name) {
    throw new Error("Name is required for creating a ArcLab.");
  }

  if (!UserId) {
    throw new Error("UserId is required for creating a ArcLab.");
  }

  const ifNameExists = await ArcLabModel.findOne({ name });

  if (ifNameExists) {
    throw new Error("ArcLab with this name already exists.");
  }

  const ArcLab = await ArcLabModel.create({
    name,
    UserId,
  });

  return ArcLab;
};
