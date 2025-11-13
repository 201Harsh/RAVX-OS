import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import http from "http";

const server = http.createServer(app);

const port = process.env.PORT || 5000;

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default server;
