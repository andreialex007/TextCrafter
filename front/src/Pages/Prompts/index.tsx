import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import Store from './Store';
import { Route, Switch } from 'wouter';
import Page404 from '@/Common/Page404';
import EditPrompt from './EditPrompt';
import EditCategory from './EditCategory';
import Confirmation from '@/Common/Confirmation';
import EditDelRow from '@/Pages/Prompts/EditDelRow.tsx';

const highlightSearchTerm = (text: string, searchTerm: string) => {
 if (!searchTerm) return text;

 const regex = new RegExp(`(${searchTerm})`, 'gi');
 const parts = text.split(regex);

 return parts.map((part, index) =>
  regex.test(part) ? (
   <span key={index} style={{ backgroundColor: 'lightblue' }}>
    {part}
   </span>
  ) : (
   part
  ),
 );
};

export default observer(({ store }: { store: Store }) => {
 useEffect(() => {
  store.load();
 }, []);

 return (
  <Switch>
   <Route path="/">
    <div className="basic-page full flex flex-col">
     <div className="flex flex-col gap-2">
      <div className="relative flex-1">
       <input
        type="text"
        placeholder="Search..."
        className="focus:ring-azure-600 w-full rounded-lg border border-gray-300 p-2 pl-10 focus:outline-none focus:ring-2"
        value={store.searchTerm}
        onChange={(e) => (store.searchTerm = e.target.value)}
       />
       <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400"></i>
      </div>
      <div
       onClick={() => store.addCategory()}
       className="basic-btn self-end bg-emerald-600 px-3 text-white "
      >
       <i className="ri-add-box-fill"></i>
       New category
      </div>
      {store.filteredCategories.length > 0 ? (
       store.filteredCategories.map((c) => (
        <div
         key={c.id}
         onDrop={(e) => store.onDrop(c.id)}
         onDragOver={(event) => event.preventDefault()}
         className="group/main flex flex-col"
        >
         <div className="relative flex gap-3">
          <div className="relative flex w-full rounded bg-slate-500 px-2  text-white shadow">
           <div className="font-bold">
            {highlightSearchTerm(c.name, store.searchTerm)}
           </div>
           <div
            className="invisible absolute  right-0 float-end flex gap-1
           group-hover/main:visible child:shadow"
           >
            <span
             onClick={() => store.addPrompt(c.id)}
             className="basic-btn flex gap-1 bg-green-700 px-3 text-white"
            >
             <i className="ri-add-box-fill"></i> add
            </span>
            <EditDelRow
             edit={() => store.editCategory(c)}
             del={() => store.deleteCategory(c.id)}
            />
           </div>
          </div>
         </div>
         <div className=" flex flex-col ">
          {store.filterPrompts(c.prompts)?.map((p) => (
           <div
            key={p.id}
            draggable={true}
            onDragStart={(e) => (store.dragId = p.id)}
            className="group relative z-20 flex w-full cursor-pointer select-none gap-2 border pl-2 shadow-inner odd:bg-gray-100 even:bg-yellow-50 hover:opacity-60"
           >
            <span className="text-nowrap font-bold text-orange-800">
             {highlightSearchTerm(p.name, store.searchTerm)}
            </span>
            <span className="truncate italic text-gray-600">
             {highlightSearchTerm(p.content, store.searchTerm)}
            </span>
            <div className="invisible absolute right-0 top-0 flex flex-row gap-1 group-hover:visible">
             <EditDelRow
              edit={() => store.editPrompt(p)}
              del={() => store.deletePrompt(p.id, p.name, c.id)}
             />
            </div>
           </div>
          ))}
         </div>
        </div>
       ))
      ) : store.searchTerm.trim() !== '' ? (
       <div className="text-center text-gray-500">No items were found</div>
      ) : (
       <div className="text-center text-gray-500">No items</div>
      )}
     </div>
    </div>
    <EditPrompt store={store.editPromptModal} />
    <EditCategory store={store.editCategoryModal} />
    <Confirmation />
   </Route>
   <Route>
    <Page404 />
   </Route>
  </Switch>
 );
});
