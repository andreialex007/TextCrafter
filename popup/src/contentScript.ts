// @ts-ignore
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "GET_SELECTION") {
    sendResponse({ selection: window.getSelection()?.toString() });
  }
});
