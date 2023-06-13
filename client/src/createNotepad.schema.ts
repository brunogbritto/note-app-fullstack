import { z } from "zod";

const errors = {
  minLengthMessage(prop: string, min: number) {
    return `O ${prop} precisa ter pelo menos ${min} caracteres.`;
  },
  maxLengthMessage(prop: string, max: number) {
    return `O ${prop} precisa ter no máximo ${max} caracteres.`;
  },
};
const titleSchema = z
  .string()
  .min(8, {
    message: errors.minLengthMessage("título", 8),
  })
  .max(48, {
    message: errors.maxLengthMessage("título", 48),
  });
const subtitleSchema = z
  .string()
  .min(12, {
    message: errors.minLengthMessage("subtítulo", 12),
  })
  .max(64, {
    message: errors.maxLengthMessage("título", 64),
  });
const contentSchema = z
  .string()
  .min(16, {
    message: errors.minLengthMessage("conteúdo", 16),
  })
  .max(256, {
    message: errors.maxLengthMessage("conteúdo", 256),
  });

export const createNotepadSchema = z.object({
  title: titleSchema,
  subtitle: subtitleSchema,
  content: contentSchema,
});
