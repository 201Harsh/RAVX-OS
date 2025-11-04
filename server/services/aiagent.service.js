const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({ apiKey: process.env.RAVXOS_AI_API_KEY });

async function main({ prompt, AIAgent, user }) {
  const systemInstruction = `
  your Name is ${AIAgent.name}.
  your Gender is ${AIAgent.gender}.
  your Voice is ${AIAgent.voice}.
  your Personality is ${AIAgent.personality}.
  your Engine Model is ${AIAgent.engineModel}.
  your Description is ${AIAgent.description}.
  your Tone is ${AIAgent.tone}.
  your Behaviors are ${AIAgent.behaviors}.
  your Skills are ${AIAgent.skills}.
  Now Responde this prompt: ${prompt}
  and Your Creator is ${user.name}
  Now Greet the User. then Responde this prompt: ${prompt}
  `;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      systemInstruction: systemInstruction,
    },
  });
  const ResponseText = response.text;
  return ResponseText;
}

module.exports = main;
