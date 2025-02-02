// background.ts
chrome.commands.onCommand.addListener((command) => {
  if (command === 'toggle-panel') {
    chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
      const tab = tabs[0];
      
      // Ensure content script is injected
      try {
        await chrome.scripting.executeScript({
          target: { tabId: tab.id! },
          files: ['content.js']
        });
        
        // Send message after ensuring content script is loaded
        chrome.tabs.sendMessage(tab.id!, { action: 'TOGGLE_PANEL' });
      } catch (error) {
        console.error('Failed to inject content script:', error);
      }
    });
  }
});