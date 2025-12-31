
import { GoogleGenAI } from "@google/genai";

const getAIClient = () => {
  return new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
};

export const generateLeadInsights = async (leadName: string, status: string, context: string) => {
  try {
    const ai = getAIClient();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Expert Sales Manager analysis:
      Lead Name: ${leadName}
      Status: ${status}
      Context: ${context}
      Return a JSON with two fields: 'insight' and 'nextStep'. Ensure the values are in the language requested in the Context.`,
      config: {
        responseMimeType: "application/json"
      }
    });
    
    return JSON.parse(response.text || '{}');
  } catch (error) {
    console.error("AI Generation Error:", error);
    return { insight: "Analysis unavailable.", nextStep: "Perform standard follow-up." };
  }
};

export const performMarketIntel = async (query: string, language: string) => {
  try {
    const ai = getAIClient();
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `Perform professional market research for: "${query}". Provide strategic insights for a business owner. Language: ${language}.`,
      config: {
        tools: [{ googleSearch: {} }]
      }
    });

    const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks?.map((chunk: any) => chunk.web?.uri).filter(Boolean) || [];
    return {
      text: response.text,
      sources: [...new Set(sources)]
    };
  } catch (error) {
    console.error("Market Intel Error:", error);
    return { text: "Failed to perform market intelligence at this time.", sources: [] };
  }
};
