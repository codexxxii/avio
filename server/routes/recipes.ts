import { Hono } from "hono";
import { getUser } from "../clerk";
import { db } from "../db";
import { insertRecipeSchema, recipes } from "../db/schema";
import { eq } from "drizzle-orm";
import { zValidator } from "@hono/zod-validator";
import { createRecipeSchema } from "../shared-types";

export const recipeRoutes = new Hono()
  .get("/", getUser, async (c) => {
    try {
      const { userId } = c.var.user;

      const data = await db.query.recipes.findMany({
        where: eq(recipes.user_id, userId),
        orderBy: (recipes, { desc }) => [desc(recipes.created_at)],
        columns: {
          id: true,
          name: true,
          category: true,
        },
      });

      return c.json({ data });
    } catch (error) {
      console.log(error);
      throw error;
    }
  })
  .post("/", getUser, zValidator("json", createRecipeSchema), async (c) => {
    try {
      const { userId } = c.var.user;
      const json = c.req.valid("json");

      const validSchema = insertRecipeSchema.parse({
        ...json,
        user_id: userId,
        ingredients: json.ingredients.map((i) => i.ingredient),
        instructions: json.instructions.map((i) => i.instruction),
      });

      const data = await db
        .insert(recipes)
        .values(validSchema)
        .returning()
        .then((res) => res[0]);

      return c.json({ data });
    } catch (error) {
      console.log(error);
      throw error;
    }
  });
