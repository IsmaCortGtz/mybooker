// Dependencies
import { Hono } from 'hono';
import { cors } from 'hono/cors'
import { trimTrailingSlash } from 'hono/trailing-slash';

// Preact imports
import client from '#l/server/routes/client';

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
app.get("/", client.html);
app.get("/assets/index.css", client.css);
app.get("/assets/index.js", client.js);
app.notFound(client.html);

// Start server
export default (port) => Bun.serve({
  fetch: app.fetch,
  port: port
});