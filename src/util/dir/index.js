import { resolve } from "node:path";

const APP_ROOT_PATH = resolve(".");
export const get = (...paths) => (
    resolve(APP_ROOT_PATH, ...paths)
);

const dir = {
    root: get,
    src: (...path) => get("src", ...path),
    extensions: (...path) => get("extensions", ...path),
    config: (...path) => get("config", ...path)
};

dir.src.core = (...path) => dir.src("core", ...path);
dir.src.server = (...path) => dir.src("server", ...path);
dir.src.server = (...path) => dir.src("server", ...path);
dir.src.util = (...path) => dir.src("util", ...path);

dir.config.cache = (...path) => dir.config("cache", ...path);
dir.config.db = (...path) => dir.config("db", ...path);

export default dir;