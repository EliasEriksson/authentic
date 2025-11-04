import { z } from "zod";

export interface Mime {
  name: string;
  match: (mime: string) => boolean;
  serializer: (value: unknown) => BodyInit;
  parser: <T>(
    stream: ReadableStream<Uint8Array>,
    schema: z.Schema<T>,
  ) => AsyncGenerator<T>;
}

export const json: Mime = {
  name: "application/json",
  match: (mime: string) => !!mime.match(/application.*\/.*json/),
  serializer: JSON.stringify,
  parser: async function* (stream: ReadableStream<Uint8Array>, schema) {
    const decoder = new TextDecoder();
    let buffer = "";
    for await (const chunk of stream) {
      buffer += decoder.decode(chunk, { stream: true });
    }
    buffer += decoder.decode();
    const t = schema.parse(JSON.parse(buffer));
    yield t;
  },
};
