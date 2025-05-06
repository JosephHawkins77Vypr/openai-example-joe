import OpenAI from "openai";
import "dotenv/config";
import { zodTextFormat } from "openai/helpers/zod";
import { steerResponseSchema } from "./schema/steerResponseSchema";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const generateSteerSummary = async (
  steerInfo: string
): Promise<void> => {
  console.log("Generating steer summary...");

  const response = await openai.responses.create({
    model: "gpt-4o",
    input: [
      {
        role: "system",
        content: [
          {
            type: "input_text",
            text: `We conduct surveys and allow users to submit their responses. We may allow users to submit one of two kinds of responses: "freetext" and "singleAnswer" . In the case of freetext, a user can write their own thoughts on the question freely, where as in SingleAnswer they are given several options and choose one. In the user response it will tell you what the question was, what kind of steer it was (freetext or singleAnswer) and a list of all the responses to that question."\nCould you please return me an object with one property:\n\n"summary" - a short summary containing: overall analysis/what the steer tells us and next steps/what we should do next\nIf (and only if) the steer is a "SingleAnswer" I would like you to also create a section that breaks down the responses into the possible answers and show the percentage each one was responded.\n\nHowever, in the case of a free text, I would like you to add a section that shows a breakdown of "Positive", "Neutral" and "Negative" sentiments and the percentage of each one.\n\n`,
          },
        ],
      },
      {
        role: "user",
        content: steerInfo,
      },
      { role: "user", content: steerInfo },
    ],
    text: {
      format: zodTextFormat(steerResponseSchema, "steer_response_schema"),
    },
    reasoning: {},
    tools: [],
    temperature: 1,
    max_output_tokens: 2048,
    top_p: 1,
    store: true,
  });

  // console.log(response);
  console.log(JSON.parse(response.output_text).data);
};
