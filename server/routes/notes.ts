import { Hono } from "hono";
import { getUser } from "../clerk";
import { db } from "../db";
import { eq } from "drizzle-orm";
import { insertNoteSchema, notes } from "../db/schema";
import { createNoteSchema } from "../shared-types";
import { zValidator } from "@hono/zod-validator";

export const noteRoutes = new Hono()
  .get("/", getUser, async (c) => {
    try {
      const { userId } = c.var.user;

      const data = await db.query.notes.findMany({
        where: eq(notes.user_id, userId),
        orderBy: (notes, { desc }) => [desc(notes.created_at)],
      });

      return c.json({ data });
    } catch (error) {
      console.log(error);
      throw error;
    }
  })
  .post("/", getUser, zValidator("json", createNoteSchema), async (c) => {
    try {
      const { userId } = c.var.user;
      const note = c.req.valid("json");

      const validNote = insertNoteSchema.parse({
        ...note,
        user_id: userId,
      });

      const data = await db
        .insert(notes)
        .values(validNote)
        .returning()
        .then((res) => res[0]);

      c.status(201);

      return c.json({ note });
    } catch (error) {
      console.log(error);
      throw error;
    }
  });
