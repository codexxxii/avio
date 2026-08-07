import { clerkMiddleware } from "@clerk/hono";
import { Hono } from "hono";
import { logger } from "hono/logger";
import { homeRoutes } from "./routes/home";
import { authRoutes } from "./routes/auth";

const app = new Hono();

app.use("*", logger());
app.use("*", clerkMiddleware());

const apiRoutes = app
  .basePath("/api")
  .route("/", authRoutes)
  .route("/home", homeRoutes);

export default app;
export type ApiRoutes = typeof apiRoutes;
