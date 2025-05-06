import OpenAI from "openai";
import "dotenv/config";
import { exampleSteerResponse } from "../mockData/steerResponseExample";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const generateSteerSummary = async () => {
  console.log("Generating steer summary...");

  const response = await openai.responses.create({
    model: "gpt-4o",
    input: [
      {
        role: "system",
        content: [
          {
            type: "input_text",
            text: `We did a survey at sainsburys with the question: "What could be made better about the current cooking spinach offering in Sainsbury\'s, to make you more likely to buy?" and received the following responses:\n\n"${exampleSteerResponse}"\ncould you please return me an object with two properties:\n\n"summary" - a short summary containing:  overall analysis/what the steer tells us and next steps/what we should do next\n"sentimentAnalysis" - another string containing sentiment analysis of what the data shows and a summary of key themes.\n\nBoth of these properties should just come back as one string.`,
          },
        ],
      },
    ],
    text: {
      format: {
        name: "steer_summary_schema",
        type: "json_schema",
        schema: {
          type: "object",
          additionalProperties: false,
          properties: {
            summary: { type: "string" },
            sentimentAnalysis: { type: "string" },
          },
          required: ["summary", "sentimentAnalysis"],
        },
      },
    },
    reasoning: {},
    tools: [],
    temperature: 1,
    max_output_tokens: 2048,
    top_p: 1,
    store: true,
  });

  console.log(response);
  console.log(JSON.parse(response.output_text));
};
