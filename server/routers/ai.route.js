const router = require("express").Router();
const AuthMiddleware = require("../middlewares/auth.middleware");
const ValidateMiddleware = require("../middlewares/validatedata.middleware");
const AIAgentController = require("../controllers/ai.controller");
const { body } = require("express-validator");

router.post(
  "/create/:id",
  [
    body("name").isString().notEmpty().withMessage("Name is required"),
    body("gender").isString().notEmpty().withMessage("Gender is required"),
    body("voice").isString().notEmpty().withMessage("Voice is required"),
    body("personality")
      .isString()
      .notEmpty()
      .withMessage("Personality is required"),
    body("engineModel")
      .isString()
      .notEmpty()
      .withMessage("engineModel is required"),
    body("description")
      .isString()
      .notEmpty()
      .withMessage("Description is required"),
    body("tone").isString().notEmpty().withMessage("Tone is required"),
    body("behaviors").isArray().withMessage("Behaviors must be an array"),
    body("skills").isArray().withMessage("Skills must be an array"),
  ],
  ValidateMiddleware.ValidateData,
  AuthMiddleware.authUser,
  AIAgentController.CreateAIAgent
);

router.get("/get/:id", AuthMiddleware.authUser, AIAgentController.GetAIAgent);

router.get("/get/agent/:id", AIAgentController.GetAIAgentBYId);

router.get('/get/all/agents', AIAgentController.GetAllAIAgent)

router.delete(
  "/del/:id",
  AuthMiddleware.authUser,
  AIAgentController.DeleteAIAgent
);

router.post(
  "/agent/:id",
  [body("prompt").isString().notEmpty().withMessage("Prompt is required")],
  ValidateMiddleware.ValidateData,
  AIAgentController.AIAgent
);

module.exports = router;
