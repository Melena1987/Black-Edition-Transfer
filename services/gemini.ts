
import { GoogleGenAI, Type } from "@google/genai";

// Initialize the Gemini API client using the API key from the environment variable process.env.API_KEY.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const parseTravelRequest = async (prompt: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: `You are an assistant for Black Edition Transfer. Your task is to extract booking details from a text message. 
        If the user asks for prices, state that they will be contacted via WhatsApp.
        Extract: origin, destination, service type (transfer or disposition), hours (if disposition), approximate date, and number of people.`,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            origin: { type: Type.STRING },
            destination: { type: Type.STRING },
            serviceType: { type: Type.STRING, enum: ['transfer', 'disposition'] },
            hours: { type: Type.NUMBER },
            passengers: { type: Type.NUMBER },
            date: { type: Type.STRING },
            summary: { type: Type.STRING }
          },
          required: ['summary']
        }
      }
    });

    return JSON.parse(response.text || '{}');
  } catch (error) {
    console.error("Gemini parse error:", error);
    return null;
  }
};
