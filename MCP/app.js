import express from "express";
import cors from "cors";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import MCPRouter from "./routes/mcp.route.js";
import { webSearchTool } from "./tools/tools.js";

const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));

// ✅ Create MCP Server instance
export const server = new McpServer({
  name: "ravx-mcp-server",
  version: "1.0.0",
});

// ✅ Custom arrays/maps to track tools & executors
server._registeredTools = [];
server._toolExecutors = new Map();

// ✅ Monkey patch registerTool to also save executors
const originalRegisterTool = server.registerTool.bind(server);

server.registerTool = function (name, config, execute) {
  this._registeredTools.push({
    name,
    description: config.description || "",
    inputSchema: config.inputSchema || {},
    outputSchema: config.outputSchema || {},
  });

  this._toolExecutors.set(name, execute);
  return originalRegisterTool(name, config, execute);
};

server.getRegisteredTools = function () {
  return this._registeredTools;
};

server.getExecutor = function (name) {
  return this._toolExecutors.get(name);
};

// ✅ Register your tools here
server.registerTool(
  webSearchTool.name,
  webSearchTool.config,
  webSearchTool.execute
);

app.use("/mcp", MCPRouter);

export default app;
