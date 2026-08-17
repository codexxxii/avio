import { Hono } from "hono";

import { createRouteHandler } from "uploadthing/server";

import { uploadRouter } from "../uploadthing";

export const handlers = createRouteHandler({
  router: uploadRouter,
  config: {},
});
