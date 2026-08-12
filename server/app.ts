import { clerkMiddleware } from "@clerk/hono";
import { Hono } from "hono";
import { logger } from "hono/logger";
import { authRoutes } from "./routes/auth";
import { noteRoutes } from "./routes/notes";

const app = new Hono();

app.use("*", logger());
app.use("*", clerkMiddleware());

const apiRoutes = app
  .basePath("/api")
  .route("/", authRoutes)
  .route("/notes", noteRoutes);

export default app;
export type ApiRoutes = typeof apiRoutes;
