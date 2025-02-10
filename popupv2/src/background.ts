chrome.commands.onCommand.addListener((command) => {
  if (command === "open-popup") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tabId = tabs[0]?.id;
      if (tabId) {
        chrome.tabs.sendMessage(
          tabId,
          { type: "GET_SELECTION" },
          (response) => {
            const selection = response?.selection || "";
            chrome.storage.local.set({ selectedText: selection }, () => {
              chrome.action.openPopup();
            });
          },
        );
      }
    });
  }
});
