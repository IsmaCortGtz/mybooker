import { Hono } from "hono";

import add from "./add";

const filesRouter = new Hono();

filesRouter.post("/add", add);

export default filesRouter;