import { z } from "zod";

export const Tokens = z.object({
  access_token: z.string(),
});

export type Tokens = z.Infer<typeof Tokens>;
