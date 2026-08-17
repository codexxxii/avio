import { clerkMiddleware } from "@clerk/hono";
import { Hono } from "hono";
import { logger } from "hono/logger";
import { authRoutes } from "./routes/auth";
import { noteRoutes } from "./routes/notes";
import { recipeRoutes } from "./routes/recipes";
import { handlers } from "./routes/uploadthing";

const app = new Hono();

app.use("*", logger());
app.use("*", clerkMiddleware());

const apiRoutes = app
  .basePath("/api")
  .route("/", authRoutes)
  .route("/notes", noteRoutes)
  .route("/recipes", recipeRoutes)
  .all("/uploadthing", (context) => handlers(context.req.raw));

export default app;
export type ApiRoutes = typeof apiRoutes;
