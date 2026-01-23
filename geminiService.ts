
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getAITutorResponse = async (userMessage: string, context?: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: context 
        ? `السياق التعليمي: ${context}\n\nسؤال الطالب: ${userMessage}`
        : userMessage,
      config: {
        systemInstruction: "أنت المساعد الدراسي الرسمي لمنصة BayanStudy. خبير في المنظومة التربوية المغربية (ابتدائي، إعدادي، ثانوي تأهيلي). إجاباتك يجب أن تكون دقيقة، محفزة، وباللغة العربية الفصحى المبسطة. عند شرح الرياضيات أو العلوم، التزم بالمصطلحات العلمية المعتمدة في المغرب (بالعربية أو الفرنسية حسب المسلك). ركز على مساعدة الطالب في فهم 'كيفية الحل' وليس فقط تقديم الإجابة النهائية.",
        temperature: 0.7,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "عذراً، واجهت مشكلة التقنية في معالجة طلبك. يرجى المحاولة بعد لحظات.";
  }
};

export const generateQuiz = async (subject: string, level: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `أنشئ 3 أسئلة اختيار من متعدد في مادة ${subject} لمستوى ${level} وفق المقررات المغربية.`,
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
              correctAnswer: { type: Type.INTEGER, description: "رقم الإجابة الصحيحة (0-3)" }
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
