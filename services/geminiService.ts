import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getStyleAdvice = async (userQuery: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: userQuery,
      config: {
        systemInstruction: `你是一位名叫 MIAOCHEN 的顶级发型师的 AI 助理。
        你的语气是时尚、专业、略带高冷的（edgy）。
        请用简体中文回答。
        保持回答简洁（80字以内）。
        根据用户的描述（脸型、发质、风格偏好）提供发型建议。
        如果被问及价格，请引导他们查看服务菜单（Book Now）。`,
      }
    });
    
    return response.text || "我的剪刀正在打磨中，请稍后再试。";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "灵感连接暂时中断，请稍后再试。";
  }
};