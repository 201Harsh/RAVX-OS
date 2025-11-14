import { server } from "../app.js";

export const RunMCPServer = async (req, res) => {
  try {
    const body = req.body;

    if (!body || !body.params?.name) {
      return res.status(400).json({
        jsonrpc: "2.0",
        method: "tools/call",
        error: {
          code: -32600,
          message: "Invalid request: Missing tool name or parameters",
        },
        id: body?.id || null,
      });
    }

    const { name, arguments: args = {} } = body.params;

    const toolEntry = server._registeredTools.find((t) => t.name === name);

    if (!toolEntry) {
      return res.status(404).json({
        jsonrpc: "2.0",
        error: { code: -32601, message: `Tool '${name}' not found.` },
        id: body.id || null,
      });
    }

    const executeFn = server.getExecutor(name);

    if (!executeFn) {
      return res.status(500).json({
        jsonrpc: "2.0",
        error: { code: -32000, message: `No executor for '${name}'.` },
        id: body.id || null,
      });
    }

    const result = await executeFn(args);

    return res.status(200).json({
      jsonrpc: "2.0",
      id: body.id,
      result: {
        structuredContent: result.structuredContent || result,
      },
    });
  } catch (error) {
    res.status(500).json({
      jsonrpc: "2.0",
      error: { code: -32603, message: error.message || "Internal error" },
      id: req.body?.id || null,
    });
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
    res.status(500).json({
      error: error.message,
    });
  }
};
