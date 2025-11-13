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
    console.log(name, args);
    console.log("🧠 Running MCP Tool:", name, "with args:", args);

    const toolEntry = server._registeredTools.find((t) => t.name === name);

    if (!toolEntry) {
      console.error(`❌ Tool '${name}' not found.`);
      return res.status(404).json({
        jsonrpc: "2.0",
        error: { code: -32601, message: `Tool '${name}' not found.` },
        id: body.id || null,
      });
    }

    const executeFn = server.getExecutor(name);

    if (!executeFn) {
      console.error(`❌ No execute function for '${name}'`);
      return res.status(500).json({
        jsonrpc: "2.0",
        error: { code: -32000, message: `No executor for '${name}'.` },
        id: body.id || null,
      });
    }

    const result = await executeFn(args);
    console.log("✅ Tool executed successfully:", result);

    return res.status(200).json({
      jsonrpc: "2.0",
      id: body.id,
      result: {
        structuredContent: result.structuredContent || result,
      },
    });
  } catch (error) {
    console.error("❌ Error running MCP tool:", error);
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
    console.error("❌ Error fetching tools:", error);
    res.status(500).json({
      error: error.message,
    });
  }
};
