import { Hono } from "hono";

import list from "./list";
import add from "./add";

const categoryRouter = new Hono();

categoryRouter.get("/list/:categoryName", list);
categoryRouter.post("/add/:categoryName", add);

export default categoryRouter;