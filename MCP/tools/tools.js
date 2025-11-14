import { z } from "zod";

export const webSearchTool = {
  name: "web_search",
  config: {
    title: "Web Search",
    description: "Search the web using Google Custom Search API",
    inputSchema: { query: z.string() },
    outputSchema: {
      results: z.array(
        z.object({
          title: z.string(),
          url: z.string(),
          snippet: z.string(),
        })
      ),
    },
  },

  execute: async ({ query }) => {
    const resp = await fetch(
      `https://www.googleapis.com/customsearch/v1?key=${
        process.env.GOOGLE_API_KEY
      }&cx=${process.env.GOOGLE_SEARCH_ENGINE_ID}&q=${encodeURIComponent(
        query
      )}`
    );

    const data = await resp.json();

    const results =
      data.items?.map((item) => ({
        title: item.title,
        url: item.link,
        snippet: item.snippet,
      })) || [];

    return {
      content: [{ type: "text", text: JSON.stringify(results) }],
      structuredContent: { results },
    };
  },
};
