import axios from "axios";

const MCP_SERVER_URL = process.env.MCP_SERVER_URL;

// Send a raw JSON-RPC request to the MCP server
export async function callMCPTool(toolName, args = {}) {
  try {
    const requestBody = {
      jsonrpc: "2.0",
      id: Date.now(),
      method: "call_tool",
      params: {
        name: toolName,
        arguments: args,
      },
    };

    const { data } = await axios.post(`${MCP_SERVER_URL}/run`, requestBody, {
      headers: { "Content-Type": "application/json" },
    });

    return (
      data.result?.structuredContent || data.result || { error: "No result" }
    );
  } catch (error) {
    console.error("Error calling MCP tool:", error.message);
    return { error: error.message };
  }
}

export async function getMCPTools() {
  try {
    const { data } = await axios.get(`${MCP_SERVER_URL}/tools`);
    return data.tools || [];
  } catch (error) {
    console.error("Error fetching MCP tools:", error.message);
    return [];
  }
}
