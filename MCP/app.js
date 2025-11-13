import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import express from "express";
import cors from "cors";
import MCPROuter from "./routes/mcp.route.js";
import { echoTool } from "./tools/tools.js";

const app = express();
app.use(express.json());
app.use(cors());
app.use("/mcp", MCPROuter);

// Create the MCP server once (can be reused across requests)
export const server = new McpServer({
  name: "example-server",
  version: "1.0.0",
});

server.registerTool({
  name: echoTool.name,
  description: echoTool.description,
  inputSchema: echoTool.inputSchema,
  outputSchema: echoTool.outputSchema,
  execute: echoTool.implementation,
});

server._registeredTools = [];

server.registerTool = function ({
  name,
  description,
  inputSchema,
  outputSchema,
  execute,
}) {
  this._registeredTools.push({ name, description, inputSchema, outputSchema });
  McpServer.prototype.registerTool.call(
    this,
    name,
    { description, inputSchema, outputSchema },
    execute
  );
};

// Add a helper to get all registered tools
server.getRegisteredTools = function () {
  return this._registeredTools;
};

export default app;
