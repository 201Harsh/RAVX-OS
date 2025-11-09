const { GoogleGenAI } = require("@google/genai");
const wav = require("wav-encoder");

async function VoiceService({ text, aiVoice }) {
  const ai = new GoogleGenAI({ apiKey: process.env.RAVXOS_AI_API_KEY });

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text }] }],
      config: {
        responseModalities: ["AUDIO"],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: aiVoice },
          },
        },
      },
    });

    // Gemini returns raw PCM base64
    const base64Data =
      response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    const pcmBuffer = Buffer.from(base64Data, "base64");

    // Wrap PCM → WAV using wav-encoder
    const wavBuffer = await wav.encode({
      sampleRate: 24000,
      channelData: [
        new Float32Array(
          new Int16Array(
            pcmBuffer.buffer,
            pcmBuffer.byteOffset,
            pcmBuffer.length / 2
          ).map((x) => x / 32768)
        ),
      ],
    });

    return Buffer.from(wavBuffer);
  } catch (err) {
    console.error("TTS Error:", err);
    return "No Audio Generated"
  }
}

module.exports = VoiceService;
