const axios = require("axios");

const MCP_SERVER_URL = process.env.MCP_SERVER_URL;

// Send a raw JSON-RPC request to the MCP server
module.exports.callMCPTool = async function callMCPTool(toolName, args = {}) {
  try {
    const requestBody = {
      jsonrpc: "2.0",
      id: Date.now(),
      method: "tools/call",
      params: {
        name: toolName,
        arguments: args,
      },
    };

    const { data } = await axios.post(
      `${MCP_SERVER_URL}/mcp/run`,
      requestBody,
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    return (
      data.result?.structuredContent || data.result || { error: "No result" }
    );
  } catch (error) {
    return { error: error.message };
  }
};

module.exports.getMCPTools = async function getMCPTools() {
  try {
    const { data } = await axios.get(`${MCP_SERVER_URL}/mcp/tools`);
    return data.tools || [];
  } catch (error) {
    return [];
  }
};
