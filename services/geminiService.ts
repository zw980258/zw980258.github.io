import { GoogleGenAI } from "@google/genai";

// Safely get the API key, defaulting to empty string if undefined
// In a static file deployment without env injection, this prevents a crash.
const apiKey = process.env.API_KEY || "";

// Only initialize if key exists
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export const getStyleAdvice = async (userQuery: string): Promise<string> => {
  if (!ai) {
    return "系统维护中：API 密钥未配置。请联系管理员或稍后再试。";
  }

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