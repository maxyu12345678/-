import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export async function generateAromatherapyOutline(
  audience: string,
  duration: string,
  topics: string[]
): Promise<string> {
  const topicsString = topics.map(topic => `- ${topic}`).join('\n');

  const prompt = `
    請你扮演一位結合東西方智慧的芳療與穴位按摩專家，擅長製作活潑生動的客製化教材。

    你的任務是為特定對象設計一份投影片大綱，主題是「芳香療法與穴位按摩的療癒之旅」。

    **簡報條件如下：**
    *   **對象：** ${audience}
    *   **時間：** ${duration}
    *   **必須包含的內容模組：**
        ${topicsString}

    **請根據以上條件，產出一份結構完整、內容豐富的投影片大綱，並遵循以下指示：**
    1.  **語言**：全程使用「繁體中文」。
    2.  **風格**：內容生動有趣、親切易懂。請根據指定的「對象」調整語氣和案例，讓他們感覺芳療是可以在日常工作與生活中輕鬆應用的。
    3.  **結構**：條理分明，適合製作成投影片。開頭需有引言，結尾要有總結和Q&A環節。請合理分配「時間」，讓每個模組的內容份量適中。
    4.  **內容客製化**：
        *   **開場**：設計一個能引起「${audience}」共鳴的開場白或小故事。
        *   **案例**：在講解各模組時，盡量舉出符合「${audience}」生活或工作情境的例子。
        *   **深度**：根據「${audience}」的背景調整內容的專業深度。例如，對護理師可以多談一些生理機制，對一般大眾則可以著重生活應用。
    5.  **輸出格式**：請直接輸出這份投影片大綱，使用 Markdown 語法來組織標題、子標題與清單。

    現在，請開始產生這份為「${audience}」量身打造，長度為「${duration}」的精彩簡報大綱。
    `;

  try {
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
    });
    
    if (response.text) {
        return response.text;
    } else {
        throw new Error("API returned no text.");
    }

  } catch (error) {
    console.error("Error generating content from Gemini API:", error);
    throw new Error("Failed to generate outline from Gemini API.");
  }
}
