
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getAITutorResponse = async (userMessage: string, context?: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: context 
        ? `Context: ${context}\n\nStudent asks: ${userMessage}`
        : userMessage,
      config: {
        systemInstruction: "أنت مساعد دراسي ذكي لموقع BayanStudy. أنت خبير في المنهج المغربي (الابتدائي، الإعدادي، التأهيلي). اجعل إجاباتك مشجعة، واضحة، وباللغة العربية الفصحى أو الدارجة المغربية المهذبة عند الحاجة لتبسيط المفاهيم. ركز على الرياضيات والعلوم واللغات.",
        temperature: 0.7,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "عذراً، واجهت مشكلة في الاتصال. حاول مرة أخرى.";
  }
};

export const generateQuiz = async (subject: string, level: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `أنشئ 3 أسئلة اختيار من متعدد في مادة ${subject} لمستوى ${level} في المغرب.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              question: { type: Type.STRING },
              options: { 
                type: Type.ARRAY, 
                items: { type: Type.STRING } 
              },
              correctAnswer: { type: Type.INTEGER, description: "Index of the correct option (0-3)" }
            },
            required: ["question", "options", "correctAnswer"]
          }
        }
      }
    });
    return JSON.parse(response.text || "[]");
  } catch (error) {
    console.error("Quiz Generation Error:", error);
    return [];
  }
};
