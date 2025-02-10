import { Webview } from "webview-bun";
const timeout = setTimeout(() => process.exit(0), 5000);

self.addEventListener("message", async (event) => {
  // Check if the message is to open a webview
  if (event.data?.type !== "open-webview") return;
  if (!event.data.url) return;

  // Clear the timeout
  clearTimeout(timeout);

  // Create a new webview and navigate to the URL
  const webview = new Webview();
  webview.navigate(event.data.url);
  webview.run();

  // Exit the worker when the webview is closed
  process.exit(0);
});