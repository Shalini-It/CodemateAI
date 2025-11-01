import OpenAI from "openai";

// This integration uses OpenAI's API (blueprint:javascript_openai)
// The newest OpenAI model is "gpt-5" which was released August 7, 2025. Do not change this unless explicitly requested by the user

let openaiClient: OpenAI | null = null;

function getOpenAIClient(): OpenAI {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY is not configured");
  }
  
  if (!openaiClient) {
    openaiClient = new OpenAI({ 
      apiKey: process.env.OPENAI_API_KEY 
    });
  }
  
  return openaiClient;
}

export interface TipRequest {
  language: string;
  topic: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
}

export interface GeneratedTip {
  title: string;
  code: string;
  explanation: string;
  language: string;
  topic: string;
  difficulty: string;
  readingTime: string;
}

export async function generateProgrammingTip(request: TipRequest): Promise<GeneratedTip> {
  try {
    const { language, topic, difficulty } = request;

    const prompt = `Generate a practical programming tip for ${language} focused on ${topic} suitable for ${difficulty} level developers.

Your response must be valid JSON with this exact structure:
{
  "title": "A clear, concise title for the tip (max 60 characters)",
  "code": "A complete, working code example demonstrating the tip (properly formatted with correct syntax)",
  "explanation": "A detailed explanation of why this tip is important and how it works (2-3 sentences, max 200 words)",
  "readingTime": "Estimated reading time in format 'X min'"
}

Requirements:
- The code must be syntactically correct and follow best practices for ${language}
- Focus specifically on ${topic}
- Make it appropriate for ${difficulty} developers
- Be practical and immediately applicable
- The explanation should be educational and insightful`;

    const openai = getOpenAIClient();
    
    const response = await openai.chat.completions.create({
      model: "gpt-5",
      messages: [
        {
          role: "system",
          content: "You are an expert programming educator who creates clear, practical coding tips. Always respond with valid JSON only, no additional text.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      response_format: { type: "json_object" },
      max_completion_tokens: 1024,
    });

    const content = response.choices[0].message.content;
    if (!content) {
      throw new Error("No content returned from OpenAI");
    }

    const tipData = JSON.parse(content);

    return {
      title: tipData.title,
      code: tipData.code,
      explanation: tipData.explanation,
      language,
      topic,
      difficulty,
      readingTime: tipData.readingTime || "3 min",
    };
  } catch (error) {
    console.error("Error generating tip:", error);
    throw new Error("Failed to generate programming tip");
  }
}
