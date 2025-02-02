// Dependencies
import { Hono } from 'hono';
import { cors } from 'hono/cors'
import { serveStatic } from 'hono/bun';
import { trimTrailingSlash } from 'hono/trailing-slash';
import { get } from "#l/util/dir";
import indexFile from './dist/index.html' with { type: "text" };

// Hono app
const app = new Hono();

// Routers
import extensionsRouter from './routes/extensions';
import booksRouter from './routes/books';
import libraryRouter from './routes/library';
import filesRouter from './routes/files';

// Middlewares
app.use(cors());
app.use(trimTrailingSlash());


// API routes
app.route("/api/extensions", extensionsRouter);
app.route("/api/books", booksRouter);
app.route("/api/library", libraryRouter);
app.route("/api/files", filesRouter);

// Preact Frontend
app.use('*', serveStatic({ root: get("src/server/dist") }));
app.notFound((c) => c.html(indexFile));

// Start server
export default (port) => Bun.serve({
  fetch: app.fetch,
  port: port
});