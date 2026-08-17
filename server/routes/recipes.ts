import { Hono } from "hono";
import { getUser } from "../clerk";
import { db } from "../db";
import { recipes } from "../db/schema";
import { eq } from "drizzle-orm";

export const recipeRoutes = new Hono().get("/", getUser, async (c) => {
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
});
