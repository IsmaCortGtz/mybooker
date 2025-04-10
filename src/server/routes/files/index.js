import { Hono } from "hono";

import add from "./add.js";
import list from "./list.js";

const filesRouter = new Hono();

filesRouter.post("/add", add);
filesRouter.get("/list/:extensionId/:bookId", list);

export default filesRouter;