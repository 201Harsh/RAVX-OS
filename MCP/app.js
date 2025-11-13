import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import express from "express";
import { z } from "zod";
import cors from "cors";
import MCPROuter from "./routes/mcp.route.js";
import { echoTool } from "./tools/tools.js";

const app = express();
app.use(express.json());
app.use(cors());
app.use("/agent", MCPROuter);

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

export default app;
