import htmlString from '../dist/index.html' with { type: 'text' };

export default function client(c) {
  return c.html(htmlString);
}