import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import dialogStore from './Store';
import { Dialog } from '@headlessui/react';

export default observer(() => {
 return (
  <Dialog
   open={dialogStore.isOpen}
   onClose={dialogStore.handleCancel}
   className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-5"
  >
   <Dialog.Panel className="w-full max-w-md rounded-lg bg-white shadow-lg">
    <div className="p-4">
     <Dialog.Title className="text-lg font-semibold">Confirmation</Dialog.Title>
     <Dialog.Description className="mt-2">{dialogStore.message}</Dialog.Description>
    </div>
    <div className="flex justify-end gap-2 border-t border-gray-300 p-4">
     <button
      onClick={dialogStore.handleCancel}
      className="rounded-md bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
     >
      Cancel
     </button>
     <button
      onClick={dialogStore.handleConfirm}
      className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
     >
      OK
     </button>
    </div>
   </Dialog.Panel>
  </Dialog>
 );
});
