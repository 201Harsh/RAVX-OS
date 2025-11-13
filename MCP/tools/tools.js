import { z } from "zod";

export const echoTool =
  ("echo",
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
  });
