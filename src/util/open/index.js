import browser from "./browser";

async function openApp(url) {
  if (process.argv.includes("--dev")) return;
  if (process.argv.includes("--browser")) return browser(url);
  
  // Use webview
  console.log("Webview not implemented yet...");
  return browser(url);
}


export default openApp;