import { createRoot } from 'react-dom/client';
import App from './App';
import { store } from './store';

const app = document.createElement('div');
app.id = 'text-select-panel-root';
document.body.appendChild(app);
createRoot(app).render(<App />);

chrome.runtime.onMessage.addListener((message) => {
 if (message.action === 'TOGGLE_PANEL') {
  const selection = window.getSelection()?.toString().trim();
  store.togglePanel(selection);
 }
});
