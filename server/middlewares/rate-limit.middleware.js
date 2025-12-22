const rateLimit = require("express-rate-limit");

// 🌐 Global limiter for general requests
module.exports.GlobalLimit = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 20,
  message: "Too many requests, please try again after 10 minutes",
});

// 🔐 Auth-related endpoints
module.exports.registerLimit = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 3,
  message: "Too many registration attempts, please try again after 10 minutes",
});

module.exports.verifyOtpLimit = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 3,
  message: "Too many OTP verifications, please try again after 5 minutes",
});

module.exports.loginLimit = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minutes
  max: 3,
  message: "Too many login attempts, please try again after 1 minutes",
});

module.exports.logoutLimit = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minutes
  max: 3,
  message: "Too many logout attempts, please try again after 1 minutes",
});

module.exports.forgotPasswordLimit = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 3,
  message: "Too many password reset attempts, please try again after 2 minutes",
});

// 💻 Website creation limit
module.exports.createArcLabLimit = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 2,
  message:
    "Too many website creation requests, please try again after 5 minutes",
});

// ⚙️ Developer Mode / AI usage limiter
module.exports.AILimit = rateLimit({
  windowMs: 12 * 60 * 60 * 1000, // 12 hours
  max: 20,
  message: "Your AI usage limit has been reached, please try again after 12 hours",
});

