const UserModel = require("../models/user.model");
const AIAgentModel = require("../models/AIAgent.model");

module.exports.CreateAIAgent = async (req, res) => {
  try {
    
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
