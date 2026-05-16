import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash-lite"
});

export async function askLLM(message) {
  const prompt = `
You are a layout assistant.

Return ONLY valid JSON.

Example:
{
  "action": "move_node",
  "target": "headline",
  "position": "top"
}

User Request:
${message}
`;

  const result = await model.generateContent(prompt);

  const response = result.response.text();

  return JSON.parse(response);
}