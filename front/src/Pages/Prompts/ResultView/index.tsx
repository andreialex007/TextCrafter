import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import Store from './Store';

export default observer(({ store }: { store: Store }) => {
 useEffect(() => {
  const handleKeyDown = (event: KeyboardEvent) => {
   console.log('event.key=', event.key);
   if (event.key === 'Backspace') {
    event.preventDefault();
    store.goBack();
   }
  };

  window.addEventListener('keydown', handleKeyDown);
  return () => window.removeEventListener('keydown', handleKeyDown);
 }, [store]);

 return (
  <div className="pb-5 pl-5 pr-5">
   <div className="mb-1 flex">
    <div
     onClick={() => store.goBack()}
     className="flex cursor-pointer items-center text-nowrap bg-slate-300 px-3 pr-3 hover:opacity-50"
    >
     <i className="ri-arrow-left-double-line"></i>
     List of prompts
    </div>
    <div
     className="flex flex-grow items-center overflow-x-hidden truncate text-nowrap
     bg-gray-100 px-4 "
    >
     {store.prompt.content}
    </div>
    <div>
     <span
      onClick={() => store.apply()}
      className="basic-btn bg-green-600 px-2 py-1 text-white"
     >
      <i className="ri-checkbox-circle-fill"></i>
      Apply
     </span>
    </div>
   </div>
   <div className="flex">
    {store.elements.map((x, index) => (
     <span
      key={index}
      onClick={() => store.setActiveTab(index)}
      className={
       'w-1/3 cursor-pointer truncate border border-gray-200 px-3 py-2 ' +
       (store.activeTab === index ? 'bg-blue-100' : '')
      }
     >
      {x}
     </span>
    ))}
   </div>
   <div className="border bg-gray-50 p-3 text-sm">{store.elements[store.activeTab]}</div>
  </div>
 );
});
