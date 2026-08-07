import { Hono } from "hono";

export const homeRoutes = new Hono().get("/", (c) => {
  return c.json({ message: "Home" });
});
