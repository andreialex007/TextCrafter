import { observer } from "mobx-react-lite";
import { store } from "../store/store.ts";
import Prompts from "../../../front/src/Pages/Prompts/Prompts";
import { initAxios } from "../../../front/src/Common/Utils.ts";
import authStore from "../../../front/src/Common/AuthStore.ts";
initAxios("http://127.0.0.1:8055");
authStore.refreshAxios();

let sampleText = `A smartphone is a mobile device that combines the functionality of a traditional mobile phone with advanced computing capabilities. It typically has a touchscreen interface, allowing users to access a wide range of applications and services, such as web browsing, email, and social media, as well as multimedia playback and streaming. Smartphones have built-in cameras, GPS navigation, and support for various communication methods, including voice calls, text messaging, and internet-based messaging apps.

Smartphones are distinguished from older-design feature phones by their more advanced hardware capabilities and extensive mobile operating systems, access to the internet, business applications, mobile payments, and multimedia functionality, including music, video, gaming, radio, and television.
`;

const Panel = observer(() => {
  if (!store.isPanelVisible) return null;

  store.prompts.textExample = sampleText;

  return (
    <div id="text-selection-extension-root">
      <div className="fixed bottom-0 left-0 right-0 bg-yellow-200 shadow-lg border-t border-gray-200 p-4 font-sans">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-2"></div>
          <p className="text-gray-700">
            <textarea
              className="w-full resize-none rounded border bg-yellow-50 p-2 text-sm"
              rows={5}
              placeholder="Your text to experiment..."
              value={store.prompts.textExample}
              onChange={(e) => (store.prompts.textExample = e.target.value)}
              onKeyDown={(event) => event.stopPropagation()}
            />
            <Prompts store={store.prompts} />
          </p>
        </div>
      </div>
    </div>
  );
});

export default Panel;
