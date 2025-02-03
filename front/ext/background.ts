chrome.commands.onCommand.addListener((command) => {
 if (command === 'toggle-panel') {
  chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
   const tab = tabs[0];

   await chrome.scripting.executeScript({
    target: { tabId: tab.id! },
    files: ['content.js'],
   });

   chrome.tabs.sendMessage(tab.id!, { action: 'TOGGLE_PANEL' });
  });
 }
});
