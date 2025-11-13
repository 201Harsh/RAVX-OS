import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { server } from "../app.js";

export const RunMCPServer = async (req, res) => {
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
};

export const GetMCPTOols = async (req, res) => {
  try {
    const tools = server.getRegisteredTools();
    res.status(200).json({
      tools,
      message: "Tools Fetched Successfully!",
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({
      error: error.message,
    });
  }
};
