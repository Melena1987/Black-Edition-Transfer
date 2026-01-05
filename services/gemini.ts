
import { GoogleGenAI, Type } from "@google/genai";

export const parseTravelRequest = async (prompt: string) => {
  try {
    // Create a new instance right before making an API call to ensure it uses the up-to-date API key.
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
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

export const getPlaceSuggestions = async (query: string) => {
  if (!query || query.length < 3) return [];
  
  try {
    // Create a new instance right before making an API call.
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Provide 5 realistic location suggestions in Andalusia (Marbella, Malaga, Gibraltar, etc.) for the query: "${query}". Return only a JSON array of strings.`,
      config: {
        systemInstruction: "You are a location expert for a luxury transfer company in Marbella. Focus on airports, famous hotels, ports, and main urbanizations in the Costa del Sol area.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: { type: Type.STRING }
        }
      }
    });

    return JSON.parse(response.text || '[]');
  } catch (error) {
    console.error("Gemini suggestions error:", error);
    return [];
  }
};
