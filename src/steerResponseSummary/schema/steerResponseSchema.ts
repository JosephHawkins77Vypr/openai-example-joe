import { z } from "zod";

export const steerResponseSchema = z.object({
  data: z.array(
    z.object({
      summary: z.string(),
      //   sentimentAnalysis: z.string(),
    })
  ),
});
