import { Hono } from "hono";

import list from "./list";
import chapters from "./chapters";
import content from "./content";
import icon from "./icon";
import info from "./info";

const booksRouter = new Hono();

booksRouter.get("/list/:id", list);
booksRouter.get("/list/:extensionId/:bookId", chapters);
booksRouter.get("/icon/:extensionId/:bookId", icon);
booksRouter.get("/info/:extensionId/:bookId", info);

booksRouter.get("/content/:extensionId/:bookId/:volumeId/:chapterId", content);

export default booksRouter;