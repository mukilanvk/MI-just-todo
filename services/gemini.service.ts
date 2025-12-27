
import { GoogleGenAI, Type } from "@google/genai";
import { Board } from '../types/board.types';

const getAI = () => {
  if (!process.env.API_KEY) {
    throw new Error("API Key is missing");
  }
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

export const getWorkloadInsight = async (boards: Board[]) => {
  const ai = getAI();
  const boardSummary = boards.map(b => `${b.title} (${b.category}): ${b.progress}% progress, status: ${b.status}`).join('\n');
  
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Analyze my current workload based on these boards and provide a single-sentence encouraging summary:\n${boardSummary}`,
  });

  return response.text || "You're making great progress on your projects!";
};

export const suggestNewBoard = async (description: string) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Create a project board outline for this description: "${description}". Suggest a title, a logical category, and 3 initial tasks.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          category: { type: Type.STRING },
          tasks: { 
            type: Type.ARRAY,
            items: { type: Type.STRING }
          }
        },
        required: ["title", "category", "tasks"]
      }
    }
  });

  return JSON.parse(response.text || "{}");
};
