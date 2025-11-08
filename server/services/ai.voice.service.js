const { GoogleGenAI } = require("@google/genai");
const wav = require("wav");

async function saveWaveFile(
  filename,
  pcmData,
  channels = 1,
  rate = 24000,
  sampleWidth = 2
) {
  return new Promise((resolve, reject) => {
    const writer = new wav.FileWriter(filename, {
      channels,
      sampleRate: rate,
      bitDepth: sampleWidth * 8,
    });

    writer.on("finish", resolve);
    writer.on("error", reject);

    writer.write(pcmData);
    writer.end();
  });
}

async function main({ text, aiVoice }) {
  const ai = new GoogleGenAI({ apiKey: process.env.RAVXOS_AI_API_KEY });

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text: text }] }],
      config: {
        responseModalities: ["AUDIO"],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: aiVoice },
          },
        },
      },
    });

    const data =
      response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    const audioBuffer = Buffer.from(data, "base64");

    const fileName = "out.wav";
    await saveWaveFile(fileName, audioBuffer);

    return audioBuffer;
  } catch (error) {
    console.error(error);
    return error;
  }
}

module.exports = main;
