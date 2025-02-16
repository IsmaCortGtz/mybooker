import { Hono } from "hono";

import list from "./list.js";
import add from "./add.js";

const categoryRouter = new Hono();

categoryRouter.get("/list/:categoryName", list);
categoryRouter.post("/add/:categoryName", add);

export default categoryRouter;