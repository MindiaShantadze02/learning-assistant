const API_KEY = '';

import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: API_KEY });

export async function callGemini (text) {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: text,
  });
  console.log(response.text);
}