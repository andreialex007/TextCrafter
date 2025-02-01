import React from 'react';
import { observer } from 'mobx-react-lite';
import Store from './Store';

// A component that renders tabs and the active content pane
export default observer(({ store }: { store: Store }) => {
 return (
  <div className="pb-5 pl-5 pr-5">
   <div className="mb-1 flex">
    <div className="flex cursor-pointer items-center text-nowrap bg-slate-300 px-3 pr-3 hover:opacity-50">
     <i className="ri-arrow-left-double-line"></i>
     List of prompts
    </div>
    <div
     className="flex flex-grow items-center overflow-x-hidden truncate text-nowrap
     bg-gray-100 px-4 "
    >
     The current very lengthy prompt
    </div>
    <div>
     <span className="basic-btn bg-green-600 px-2 py-1 text-white">
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
