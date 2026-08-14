import { insertNoteSchema } from "./db/schema";
import { z } from "zod";

// Validator
export const deleteNoteSchema = insertNoteSchema.omit({
  created_at: true,
  user_id: true,
  title: true,
  content: true,
});

export const createNoteSchema = insertNoteSchema.omit({
  user_id: true,
  created_at: true,
  id: true,
});

// Client
export type CreateNote = z.infer<typeof createNoteSchema>;
