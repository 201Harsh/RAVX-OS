import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import express from "express";
import cors from "cors";
import MCPROuter from "./routes/mcp.route.js";
import { echoTool } from "./tools/tools.js";

const app = express();
app.use(express.json());
app.use(cors());

// Create the MCP server
export const server = new McpServer({
  name: "ravx-mcp-server",
  version: "1.0.0",
});

// ✅ First define tracking + override BEFORE registering any tool
server._registeredTools = [];

const originalRegisterTool = server.registerTool.bind(server);

server.registerTool = function (name, config, execute) {
  this._registeredTools.push({ name, ...config });
  return originalRegisterTool(name, config, execute);
};

server.getRegisteredTools = function () {
  return this._registeredTools;
};

// ✅ Now register tools (AFTER override)
server.registerTool(echoTool.name, echoTool.config, echoTool.execute);

app.use("/mcp", MCPROuter);

// Debug output
console.log("Registered tools:", server.getRegisteredTools());

export default app;
