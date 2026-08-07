import { Hono } from "hono";
import { getUser } from "../clerk";

export const authRoutes = new Hono().get("/current-user", getUser, (c) => {
  const user = c.var.user;
  return c.json({ user });
});
