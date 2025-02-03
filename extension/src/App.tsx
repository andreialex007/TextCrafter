import { observer } from 'mobx-react-lite';
import { store } from './store';
import Prompts from './../../front/src/Pages/Prompts/Prompts';
import { initAxios } from './../../front/src/Common/Utils';
import AuthStore from '../../front/src/Common/AuthStore.ts';

initAxios('http://127.0.0.1:8055');
AuthStore.refresh();

const App = observer(() => {
 if (!store.isOpen) return null;

 return (
  <div className="fixed bottom-0 left-0 right-0 flex border-t border-gray-200 bg-white p-4 shadow-lg">
   <div className="flex flex-col px-4 text-gray-600">
    <textarea
     className="w-full resize-none rounded border bg-yellow-50 p-2 text-sm"
     rows={5}
     placeholder="Your text to experiment..."
     value={store.selectedText}
     onChange={(e) => (store.selectedText = e.target.value)}
     onKeyDown={(event) => event.stopPropagation()}
    />
    <Prompts store={store.prompts} />
   </div>
  </div>
 );
});

export default App;
