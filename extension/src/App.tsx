import { observer } from 'mobx-react-lite';
import { panelStore } from './store';

const App = observer(() => {
 if (!panelStore.isOpen) return null;

 return (
  <div className="fixed right-0 bottom-0 left-0 flex border-t border-gray-200 bg-white p-4 shadow-lg">
   <div className="flex px-4 text-gray-600">
    {panelStore.selectedText || 'No text selected'}
   </div>
  </div>
 );
});

export default App;
