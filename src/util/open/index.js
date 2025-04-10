import browser from '#f/util/open/browser';

async function openApp(url, onClose) {
  if (process.argv.includes("--dev")) return;
  if (process.argv.includes("--browser")) return browser(url);
  
  // Use webview
  const worker = new Worker(new URL("./webview.js", import.meta.url), { type: "module" });
  worker.addEventListener("close", onClose);
  worker.postMessage({ type: "open-webview", url });
}

export default openApp;