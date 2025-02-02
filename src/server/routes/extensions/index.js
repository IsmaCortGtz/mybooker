import { Hono } from "hono";

import list from "./list";
import update from "./update";
import info from "./info";
import icon from "./icon";

const extensionRouter = new Hono();

extensionRouter.get("/list", list);
extensionRouter.get("/update", update);
extensionRouter.get("/info/:id", info);
extensionRouter.get("/icon/:id", icon);

export default extensionRouter;