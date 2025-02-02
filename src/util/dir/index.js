import { resolve } from "node:path";

const currentDir = resolve(".");
const APP_ROOT_PATH = resolve(currentDir);

export const get = (...paths) => (
    resolve(APP_ROOT_PATH, ...paths)
);

export const root = APP_ROOT_PATH;
export const src = get("src");
export const extensions = get("extensions");
export const config = get("config");

export default {
    get,
    root,
    src,
    extensions,
    config
}