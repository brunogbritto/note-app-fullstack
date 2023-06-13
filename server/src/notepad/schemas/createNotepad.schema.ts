import { z } from "zod";

const titleSchema = z.string().min(8).max(48);
const subtitleSchema = z.string().min(12).max(64);
const contentSchema = z.string().min(16).max(256);

export const createNotepadSchema = z.object({
  title: titleSchema,
  subtitle: subtitleSchema,
  content: contentSchema,
});
