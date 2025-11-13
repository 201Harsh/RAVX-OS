import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import express from "express";
import { z } from "zod";
import cors from "cors";
import MCPROuter from "./routes/mcp.route.js";

const app = express();
app.use(express.json());
app.use(cors());
app.use("/agent", MCPROuter);

// Create the MCP server once (can be reused across requests)
export const server = new McpServer({
  name: "example-server",
  version: "1.0.0",
});

// Set up your tools, resources, and prompts
server.registerTool(
  "echo",
  {
    title: "Echo Tool",
    description: "Echoes back the provided message",
    inputSchema: { message: z.string() },
    outputSchema: { echo: z.string() },
  },
  async ({ message }) => {
    const output = { echo: `Tool echo: ${message}` };
    return {
      content: [{ type: "text", text: JSON.stringify(output) }],
      structuredContent: output,
    };
  }
);

export default app;
