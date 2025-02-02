import { observer } from 'mobx-react-lite'
import { panelStore } from './store'

const App = observer(() => {
  if (!panelStore.isOpen) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white p-4 shadow-lg border-t border-gray-200">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-lg font-semibold mb-2">Selected Text</h1>
        <p className="text-gray-600">{panelStore.selectedText || 'No text selected'}</p>
      </div>
    </div>
  )
})

export default App