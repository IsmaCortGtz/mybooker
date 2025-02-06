import browser from '#l/util/open/browser';
import webview from '#l/util/open/webview' with { type: "text" };

async function openApp(url, onClose) {
  if (process.argv.includes("--dev")) return;
  if (process.argv.includes("--browser")) return browser(url);
  
  // Use webview
  const blob = new Blob([webview], { type: "text/javascript" });
  const blobUrl = URL.createObjectURL(blob);
  const worker = new Worker(blobUrl);
  worker.addEventListener("close", onClose);
  worker.postMessage({ type: "open-webview", url });
}


export default openApp;