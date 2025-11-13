import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import express from "express";
import { z } from "zod";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

// Create the MCP server once (can be reused across requests)
const server = new McpServer({
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

app.post("/mcp", async (req, res) => {
  // In stateless mode, create a new transport for each request to prevent
  // request ID collisions. Different clients may use the same JSON-RPC request IDs,
  // which would cause responses to be routed to the wrong HTTP connections if
  // the transport state is shared.

  try {
    const transport = new StreamableHTTPServerTransport({
      sessionIdGenerator: undefined,
      enableJsonResponse: true,
    });

    res.on("close", () => {
      transport.close();
    });

    await server.connect(transport);
    await transport.handleRequest(req, res, req.body);
  } catch (error) {
    console.error("Error handling MCP request:", error);
    if (!res.headersSent) {
      res.status(500).json({
        jsonrpc: "2.0",
        error: {
          code: -32603,
          message: "Internal server error",
        },
        id: null,
      });
    }
  }
});

const port = parseInt(process.env.PORT || "5000");
app
  .listen(port, () => {
    console.log(`MCP Server running on http://localhost:${port}/mcp`);
  })
  .on("error", (error) => {
    console.error("Server error:", error);
    process.exit(1);
  });
