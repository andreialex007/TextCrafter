import { observer } from "mobx-react-lite";
import { selectionStore } from "../store/selectionStore";

const Panel = observer(() => {
  if (!selectionStore.isPanelVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold">Selected Text</h3>
          <button
            onClick={() => selectionStore.togglePanel(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            ×
          </button>
        </div>
        <p className="text-gray-700">{selectionStore.selectedText}</p>
      </div>
    </div>
  );
});

export default Panel;
