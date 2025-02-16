// Dependencies
import { Hono } from 'hono';
import { cors } from 'hono/cors'
import { trimTrailingSlash } from 'hono/trailing-slash';

// Preact imports
import client from '#f/server/routes/client';

// Hono app
const app = new Hono();

// Routers
import extensionsRouter from '#i/server/routes/extensions';
import booksRouter from '#i/server/routes/books';
import libraryRouter from '#i/server/routes/library';
import filesRouter from '#i/server/routes/files';

// Middlewares
app.use(cors());
app.use(trimTrailingSlash());


// API routes
app.route("/api/extensions", extensionsRouter);
app.route("/api/books", booksRouter);
app.route("/api/library", libraryRouter);
app.route("/api/files", filesRouter);

// Preact Frontend
app.get("/", client);
app.notFound(client);

// Start server
export default (port) => Bun.serve({
  fetch: app.fetch,
  port: port,
});