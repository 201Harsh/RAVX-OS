const { GoogleGenAI } = require("@google/genai");
const wav = require("wav-encoder");

async function VoiceService({ text, aiVoice }) {
  const ai = new GoogleGenAI({ apiKey: process.env.RAVXOS_AI_AUDIO_API_KEY });

  try {
    // Step 1: Generate audio from Gemini
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

    // Step 2: Extract Base64 PCM data
    const base64Data =
      response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;

    if (!base64Data) {
      throw new Error("No audio data returned from Gemini TTS API");
    }

    // Step 3: Convert Base64 → Buffer
    const pcmBuffer = Buffer.from(base64Data, "base64");

    // Step 4: Convert Int16 PCM → Float32 (normalize for WAV)
    const int16Array = new Int16Array(
      pcmBuffer.buffer,
      pcmBuffer.byteOffset,
      pcmBuffer.length / 2
    );

    const float32Array = new Float32Array(int16Array.length);
    for (let i = 0; i < int16Array.length; i++) {
      float32Array[i] = int16Array[i] / 32768; // Normalize to -1 to +1
    }

    // Step 5: Encode to WAV
    const wavArrayBuffer = await wav.encode({
      sampleRate: 24000,
      channelData: [float32Array],
    });

    // Step 6: Convert ArrayBuffer → Node Buffer
    const wavBuffer = Buffer.from(wavArrayBuffer);

    return wavBuffer;
  } catch (err) {
    console.error("TTS Error:", err.message || err);
    return "No audio generated"; // Return null so backend can safely handle it
  }
}

module.exports = VoiceService;
