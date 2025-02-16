import { Hono } from "hono";

import add from "./add.js";

const filesRouter = new Hono();

filesRouter.post("/add", add);

export default filesRouter;