import { observer } from "mobx-react-lite";
import { selectionStore } from "../store/selectionStore";

const Panel = observer(() => {
  if (!selectionStore.isPanelVisible) return null;

  return (
    <div id="text-selection-extension-root">
      <div className="crx-fixed crx-bottom-0 crx-left-0 crx-right-0 crx-bg-yellow-200 crx-shadow-lg crx-border-t crx-border-gray-200 crx-p-4 crx-font-sans">
        <div className="crx-max-w-4xl crx-mx-auto">
          <div className="crx-flex crx-justify-between crx-items-center crx-mb-2">
            <h3 className="crx-text-lg crx-font-semibold">Selected Text</h3>
            <button
              onClick={() => selectionStore.togglePanel(false)}
              className="crx-text-gray-500 hover:crx-text-gray-700 crx-cursor-pointer"
              style={{ cursor: "pointer" }} // Add explicit cursor style
            >
              ×
            </button>
          </div>
          <p className="crx-text-gray-700">{selectionStore.selectedText}</p>
        </div>
      </div>
    </div>
  );
});

export default Panel;
