import React from 'react';
import { observer } from 'mobx-react-lite';
import Store from './Store';

export default observer(({ store }: { store: Store }) => {
 return (
  <div className="basic-page full flex flex-col">
   <div className="flex flex-col gap-2">
    <div className="basic-btn self-end bg-emerald-600 text-white ">
     <i className="ri-add-box-fill"></i>
     Add new category
    </div>
    <div className="group/main flex flex-col">
     <div className="relative flex gap-3">
      <div className="flex w-fit rounded bg-gray-500 px-2 font-bold text-white shadow">
       Category #1
      </div>
      <div className="flex- invisible float-end flex gap-1 group-hover/main:visible">
       <span className="basic-btn flex gap-1 bg-green-700 text-white">
        <i className="ri-add-box-fill"></i> add
       </span>
       <span className="basic-btn flex gap-1 bg-blue-700 text-white">
        <i className="ri-edit-fill"></i> edit
       </span>
       <span className="basic-btn flex-gap-1 bg-red-700 text-white">
        <i className="ri-delete-bin-fill"></i>
        del
       </span>
      </div>
     </div>
     <div className=" flex flex-col ">
      <div className="group relative z-20 flex w-full cursor-pointer gap-2 border pl-2 shadow-inner odd:bg-gray-100 even:bg-yellow-50 hover:opacity-60">
       <span className="text-nowrap font-bold text-orange-800">This is a short name</span>
       <span className="truncate italic text-gray-600">
        Item description, very very long description
       </span>
       <div className="invisible absolute right-0 top-0 flex flex-row gap-1 group-hover:visible">
        <span className="basic-btn flex gap-1 bg-blue-700 text-white">
         <i className="ri-edit-fill"></i> edit
        </span>
        <span className="basic-btn flex-gap-1 bg-red-700 text-white">
         <i className="ri-delete-bin-fill"></i>
         del
        </span>
       </div>
      </div>
      <div className="group relative flex w-full cursor-pointer gap-2 border pl-2 shadow-inner odd:bg-gray-100 even:bg-yellow-50 hover:opacity-60">
       <span className="text-nowrap font-bold text-orange-800">This is a short name</span>
       <span className="truncate italic text-gray-600">
        Item description, very very long description
       </span>
       <div className="invisible absolute right-0 top-0 flex flex-row gap-1 group-hover:visible">
        <span className="basic-btn flex gap-1 bg-blue-700 text-white">
         <i className="ri-edit-fill"></i> edit
        </span>
        <span className="basic-btn flex-gap-1 bg-red-700 text-white">
         <i className="ri-delete-bin-fill"></i>
         del
        </span>
       </div>
      </div>
      <div className="group relative flex w-full cursor-pointer gap-2 border pl-2 shadow-inner odd:bg-gray-100 even:bg-yellow-50 hover:opacity-60">
       <span className="text-nowrap font-bold text-orange-800">This is a short name</span>
       <span className="truncate italic text-gray-600">
        Item description, very very long description
       </span>
       <div className="invisible absolute right-0 top-0 flex flex-row gap-1 group-hover:visible">
        <span className="basic-btn flex gap-1 bg-blue-700 text-white">
         <i className="ri-edit-fill"></i> edit
        </span>
        <span className="basic-btn flex-gap-1 bg-red-700 text-white">
         <i className="ri-delete-bin-fill"></i>
         del
        </span>
       </div>
      </div>
     </div>
    </div>
   </div>
  </div>
 );
});
