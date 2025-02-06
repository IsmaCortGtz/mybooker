import html from '../dist/index.html' with { type: "text" };
import css from '../dist/assets/index.css' with { type: "text" };
import js from '../dist/assets/index.js' with { type: "text" };

export default {
  html: (c) => c.html(html),
  css: (c) => c.body(css, 200, { "Content-Type": "text/css" }),
  js: (c) => c.body(js, 200, { "Content-Type": "text/javascript" }),
}