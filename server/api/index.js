// api/index.js
const app = require("../server");

// Forward each request to Express app
module.exports = (req, res) => {
  return app(req, res);
};
