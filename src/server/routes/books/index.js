import { Hono } from "hono";

import list from "./list.js";
import chapters from "./chapters.js";
import content from "./content.js";
import icon from "./icon.js";
import info from "./info.js";

const booksRouter = new Hono();

booksRouter.get("/list/:id", list);
booksRouter.get("/list/:extensionId/:bookId", chapters);
booksRouter.get("/icon/:extensionId/:bookId", icon);
booksRouter.get("/info/:extensionId/:bookId", info);

booksRouter.get("/content/:extensionId/:bookId/:volumeId/:chapterId", content);

export default booksRouter;