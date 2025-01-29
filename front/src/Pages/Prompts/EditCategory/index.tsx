import React from 'react';
import { observer } from 'mobx-react-lite';
import Store from './Store';
import { useParams } from 'wouter';

export default observer(({ store }: { store: Store }) => {
 let params = useParams();
 if (!store.isOpen) return null;

 return (
  <dialog
   open
   className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black/50 p-5"
  >
   <div className="w-full max-w-5xl rounded-lg bg-white shadow-lg">
    {/* Modal Header */}
    <div className="flex items-center justify-between border-b border-gray-300 p-4">
     <h2 className="text-lg font-semibold">
      {(store.category.id ? 'Edit' : 'New') +
       ' Category ' +
       (store.category.id ? `#${store.category.id}` : '')}
     </h2>
     <button
      className="text-2xl font-bold text-gray-500 hover:text-gray-700"
      onClick={store.closeModal}
     >
      &times;
     </button>
    </div>

    <div className="flex flex-col gap-4 p-4">
     <div className="flex flex-col gap-2">
      <label className="font-semibold">Name:</label>
      <input
       type="text"
       className="basic-input p-2"
       value={store.category.name}
       onChange={(e) => (store.category.name = e.target.value)}
      />
     </div>
    </div>

    <div className="flex justify-end gap-2 border-t border-gray-300 p-4">
     <button
      className="rounded-md bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
      onClick={store.closeModal}
     >
      Cancel
     </button>
     <button
      className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
      onClick={() => {
       store.saveCategory();
      }}
     >
      Save
     </button>
    </div>
   </div>
  </dialog>
 );
});
