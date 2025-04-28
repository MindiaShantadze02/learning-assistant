import { API_KEY } from "../data/keys";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: API_KEY });

export async function callGemini (text) {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: text,
  });
  return response.text;
}