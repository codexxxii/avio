import { insertNoteSchema, insertRecipeSchema } from "./db/schema";
import { z } from "zod";

// Notes
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

// Recipes
export const createRecipeSchema = insertRecipeSchema
  .omit({
    user_id: true,
    created_at: true,
    id: true,
    ingredients: true,
    instructions: true,
  })
  .extend({
    ingredients: z.array(
      z.object({
        ingredient: z.string().min(1),
      }),
    ),
    instructions: z.array(
      z.object({
        instruction: z.string().min(1),
      }),
    ),
  });

export const deleteRecipeSchema = insertRecipeSchema.omit({
  name: true,
  category: true,
  ingredients: true,
  instructions: true,
  image_url: true,
  prep_time: true,
  cook_time: true,
  servings: true,
  created_at: true,
  user_id: true,
});

// Client
export type CreateNote = z.infer<typeof createNoteSchema>;
export type CreateRecipe = z.infer<typeof createRecipeSchema>;
