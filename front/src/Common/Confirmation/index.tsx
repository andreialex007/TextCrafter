import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import dialogStore from './Store';
import { Dialog } from '@headlessui/react';
import SaveCancel from './../ModalSegments/SaveCancel';

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
    <SaveCancel
     okFun={dialogStore.handleConfirm}
     cancelFun={dialogStore.handleCancel}
     cancelText="Cancel"
     okText="OK"
    />
   </Dialog.Panel>
  </Dialog>
 );
});
