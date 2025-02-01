import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import Store from './Store';

export default observer(({ store }: { store: Store }) => {
 useEffect(() => {
  store.load();
 }, [store]);

 return (
  <div>
   <div className="basic-page full flex flex-col">
    <div className="mb-3 text-4xl font-bold text-gray-800">
     <i className="ri-pie-chart-2-fill"></i>
     Statistics
    </div>
    <div className="flex gap-6">
     {/* Prompts Statistic */}
     <div className="w-60 rounded-md bg-lime-500 p-5 text-2xl text-white shadow-2xl">
      <div className="mb-6 flex justify-between text-5xl">
       <i className="ri-file-text-fill"></i>
       {/* Bind prompts count */}
       <div className="font-bold">
        {store.stat.prompts != null ? store.stat.prompts : '...'}
       </div>
      </div>
      <div>Prompts</div>
     </div>
     {/* Categories Statistic */}
     <div className="w-60 rounded-md bg-sky-500 p-5 text-2xl text-white shadow-2xl">
      <div className="mb-6 flex justify-between text-5xl">
       <i className="ri-folder-5-fill"></i>
       {/* Bind categories count */}
       <div className="font-bold">
        {store.stat.categories != null ? store.stat.categories : '...'}
       </div>
      </div>
      <div>Categories</div>
     </div>
    </div>
   </div>
  </div>
 );
});
