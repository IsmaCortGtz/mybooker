import { Hono } from "hono";

import list from "./list.js";
import update from "./update.js";
import info from "./info.js";
import icon from "./icon.js";

const extensionRouter = new Hono();

extensionRouter.get("/list", list);
extensionRouter.get("/update", update);
extensionRouter.get("/info/:id", info);
extensionRouter.get("/icon/:id", icon);

export default extensionRouter;