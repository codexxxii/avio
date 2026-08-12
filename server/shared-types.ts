import { insertNoteSchema } from "./db/schema";
import { z } from "zod";

// Validator
export const createNoteSchema = insertNoteSchema.omit({
  user_id: true,
  created_at: true,
  id: true,
});

// Client
export type CreateNote = z.infer<typeof createNoteSchema>;
