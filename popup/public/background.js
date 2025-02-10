chrome.commands.onCommand.addListener((command) => {
  if (command === "open-popup") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTab = tabs[0];
      chrome.scripting.executeScript(
        {
          target: { tabId: activeTab.id },
          function: getSelectedText,
        },
        (results) => {
          const selectedText = results[0].result;
          if (selectedText) {
            chrome.storage.local.set({ selectedText }, () => {
              chrome.windows.create({
                url: "index.html",
                type: "popup",
                width: 500,
                height: window.screen.height,
              });
            });
          }
        },
      );
    });
  }
});

function getSelectedText() {
  return window.getSelection().toString();
}
