import { observer } from "mobx-react-lite";
import { appStore } from "./stores/AppStore";

const App = observer(() => {
  return (
    <div className="w-[500px] h-screen bg-white p-4 overflow-y-auto">
      <h1 className="text-2xl font-bold text-blue-600 mb-4">Selected Text:</h1>
      <div className="p-4 bg-gray-100 rounded-lg">
        {appStore.selectedText || "No text selected"}
      </div>
    </div>
  );
});

export default App;
