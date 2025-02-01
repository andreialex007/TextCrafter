import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import Store from './Store';

export default observer(({ store }: { store: Store }) => {
 useEffect(() => {
  store.load();
 }, [store]);

 return (
  <>
   <div className="basic-page full flex flex-col">
    <table className="w-full table-auto">
     <thead>
      <tr className="">
       <th className="rounded bg-gray-500 text-white">Setting</th>
       <th className="w-full rounded bg-gray-500 text-white">Value</th>
      </tr>
     </thead>
     <tbody>
      {store.items.map((x) => (
       <tr key={x.name}>
        <td className="px-5">
         <div className="text-nowrap font-bold uppercase">{x.name}</div>
         <div className="text-nowrap italic">{x.description}</div>
        </td>
        <td>
         <input
          type="text"
          placeholder={x.description}
          className="focus:ring-azure-600 w-full rounded-lg border border-gray-300
       bg-gray-50 p-2  focus:outline-none focus:ring-2"
          value={x.value}
          onChange={(e) => (x.value = e.target.value)}
         />
        </td>
       </tr>
      ))}
     </tbody>
    </table>
    <div className="w-full">
     <button
      className="basic-btn float-end bg-green-500 px-4 py-2 text-white"
      onClick={() => {
       store.save();
      }}
     >
      <i className="ri-checkbox-circle-fill"></i>
      Save
     </button>
    </div>
   </div>
  </>
 );
});
