import * as z from "zod";
import { ZodSchema } from "zod";

export function validateWithZodSchema<T>(
  schema: ZodSchema<T>,
  data: unknown
): T {
  const results = schema.safeParse(data);

  if (!results.success) {
    const errors = results.error.errors.map((error) => error.message);
    throw new Error(errors.join(","));
  }

  return results.data;
}

export const tweetSchema = z.object({
  tweet: z.string().min(2).max(1000),
});

export const imageSchema = z.object({
  image: validateFile(),
});

function validateFile() {
  const maxUploadSize = 1024 * 1024;
  const acceptedFileTypes = ["image/"];
  return z
    .instanceof(File)
    .refine((file) => {
      return !file || file.size <= maxUploadSize;
    }, "File size must be less than 1 MB")
    .refine((file) => {
      return (
        !file || acceptedFileTypes.some((type) => file.type.startsWith(type))
      );
    }, "File must be an image");
}
