import { z } from "zod";

export const echoTool = {
  name: "echo",
  config: {
    title: "Echo Tool",
    description: "Echoes back the provided message",
    inputSchema: { message: z.string() },
    outputSchema: { echo: z.string() },
  },
  execute: async ({ message }) => {
    const output = { echo: `Tool echo: ${message}` };
    return {
      content: [{ type: "text", text: JSON.stringify(output) }],
      structuredContent: output,
    };
  },
};
