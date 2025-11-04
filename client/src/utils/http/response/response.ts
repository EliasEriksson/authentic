import { type Mime } from "../../mime/index.ts";
import { headers } from "../headers/index.ts";
import { z } from "zod";

export async function* parse<T>(
  response: Response,
  accepted: Mime[],
  schema: z.Schema<T>,
) {
  if (!response.body) return;
  const contentType = response.headers.get(headers.contentType.name);
  if (!contentType)
    throw new Error(`${headers.contentType.name} header missing.`);
  const mime = accepted.find((mime) => mime.match(contentType));
  if (!mime)
    throw new Error(
      `${headers.contentType.name} of ${contentType} does not match any of the accepted types: ${accepted.map((mime) => mime.name).join(", ")}`,
    );
  yield* mime.parser(response.body, schema);
}
