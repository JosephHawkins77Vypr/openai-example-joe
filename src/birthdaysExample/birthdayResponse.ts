import OpenAI from "openai";
import "dotenv/config";
import { zodTextFormat } from "openai/helpers/zod";

import { exampleText } from "./data/birthdayText";
import { birthdaySchemaWrapper } from "./schema/birthdaysSchema";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const generateBirthdayResponse = async () => {
  const response = await openai.responses.parse({
    model: "gpt-4o",
    input: [
      {
        role: "system",
        content: [
          {
            type: "input_text",
            text: 'For the text inputted by the user, \n\nplease extrapolate all the names and the birthdays of those people.\n\nCan you parse it into this format for me:\n\n[{\n"name": "",\n"birthday": ""\n}]',
          },
        ],
      },
      { role: "user", content: exampleText },
    ],
    text: {
      format: zodTextFormat(birthdaySchemaWrapper, "birthday_schema"),
      // name: "birthday_schema",
      // type: "json_schema",
      // schema: {
      //   type: "object",
      //   additionalProperties: false,
      //   properties: {
      //     birthdays: {
      //       type: "array",
      //       items: {
      //         type: "object",
      //         additionalProperties: false,
      //         properties: {
      //           name: { type: "string" },
      //           birthday: { type: "string" },
      //         },
      //         required: ["name", "birthday"],
      //       },
      //     },
      //   },
      //   required: ["birthdays"],
      // },
      // },
    },
    reasoning: {},
    tools: [],
    temperature: 1,
    max_output_tokens: 2048,
    top_p: 1,
    store: true,
  });

  // console.log(response);
  console.log(JSON.parse(response.output_text).birthdays);
};
