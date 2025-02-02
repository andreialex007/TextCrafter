import { createRoot } from 'react-dom/client'
import App from './App'
import { panelStore } from './store'

// Inject React app
const app = document.createElement('div')
app.id = 'text-select-panel-root'
document.body.appendChild(app)
createRoot(app).render(<App />)

// Listen for messages from background
chrome.runtime.onMessage.addListener((message) => {
  if (message.action === 'TOGGLE_PANEL') {
    const selection = window.getSelection()?.toString().trim()
    panelStore.togglePanel(selection)
  }
})