import React from 'react';
import { observer } from 'mobx-react-lite';
import Store from './Store';
import { Route, Switch } from 'wouter';
import Page404 from '@/Common/Page404';
import Edit from './Edit';

export default observer(({ store }: { store: Store }) => {
 return (
  <Switch>
   <Route path="/">
    <div className="basic-page w-full">
     <table className="w-full table-fixed">
      <thead className="font-normal text-white">
       <tr className="child:bg-slate-400 child:p-2 child:font-normal">
        <th className="w-16">
         <input
          value={store.searchId}
          onChange={(e) => (store.searchId = e.target.value)}
          className="w-full rounded bg-white px-2"
          placeholder="Id"
         />
        </th>
        <th className="w-1/4 ">
         <input
          value={store.searchRole}
          onChange={(e) => (store.searchRole = e.target.value)}
          className="w-full rounded bg-white px-2"
          placeholder="Search role"
         />
        </th>
        <th className="w-1/3 ">
         <input
          value={store.searchEmail}
          onChange={(e) => (store.searchEmail = e.target.value)}
          className="w-full rounded bg-white px-2"
          placeholder="Search email"
         />
        </th>
        <th className=" w-full">
         <input
          value={store.searchName}
          onChange={(e) => (store.searchName = e.target.value)}
          className="w-full rounded bg-white px-2"
          placeholder="Find the user name"
         />
        </th>
        <th className="w-56"></th>
       </tr>
       <tr className="child:bg-slate-500 child:p-2">
        <th className="text-left">Id</th>
        <th className="text-left">Role</th>
        <th className="text-left">Email</th>
        <th className="text-left">Name</th>
        <th className="text-left">Actions</th>
       </tr>
      </thead>
      <tbody>
       {store.items.map((x) => (
        <tr
         className={
          'group border border-gray-200 even:bg-gray-50 ' +
          'hover:heropattern-diagonalstripes-gray-200/90 child:border ' +
          'child:border-gray-200 child:p-2'
         }
         key={x.id}
        >
         <td>{x.id}</td>
         <td>{x.role}</td>
         <td>{x.email}</td>
         <td>{x.name}</td>
         <td>
          <div className="invisible flex w-full gap-2 border-none group-hover:visible">
           <span className="basic-btn bg-sky-400 px-2 text-white">
            <i className="ri-edit-fill"></i> edit
           </span>
           <span className="basic-btn bg-rose-400 px-2 text-white">
            <i className="ri-delete-bin-fill"></i>
            delete
           </span>
          </div>
         </td>
        </tr>
       ))}
      </tbody>
     </table>
    </div>
   </Route>
   <Route path="/:id">
    <Edit store={store.edit} />
   </Route>
   <Route>
    <Page404 />
   </Route>
  </Switch>
 );
});
