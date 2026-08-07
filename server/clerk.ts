import { createMiddleware } from "hono/factory";
import { getAuth } from "@clerk/hono";

type Env = {
  Variables: {
    user: any;
  };
};

export const getUser = createMiddleware<Env>(async (c, next) => {
  try {
    const user = getAuth(c);
    if (!user.isAuthenticated) {
      return c.json({ error: "UNAUTHORIZED" });
    }
    c.set("user", user);
    await next();
    return c.json({ user });
  } catch (e) {
    console.log(e);
    throw e;
  }
});
