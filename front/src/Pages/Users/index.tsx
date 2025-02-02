import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import Store from './Store';
import { Route, Switch, useLocation } from 'wouter';
import Page404 from '@/Common/Page404';
import Edit from './Edit';

export default observer(({ store }: { store: Store }) => {
 const [location, navigate] = useLocation();
 useEffect(() => {
  store.load();
 }, [store]);

 return (
  <Switch>
   <Route path="/">
    <div className="basic-page w-full">
     <table className="w-full table-fixed">
      <thead className="font-normal text-white">
       <tr className="child:bg-slate-400 child:p-2 child:font-normal">
        <th className="w-16 text-black">
         <input
          value={store.searchId ?? ''}
          type={'number'}
          onChange={(e) =>
           (store.searchId = store.triggerSearch(
            e.target.value ? parseInt(e.target.value) : null,
           ))
          }
          className="w-full rounded bg-white px-2"
          placeholder="Id"
         />
        </th>
        <th className="w-1/4 text-black">
         <input
          value={store.searchRole}
          onChange={(e) => store.triggerSearch((store.searchRole = e.target.value))}
          className="w-full rounded bg-white px-2"
          placeholder="Search role"
         />
        </th>
        <th className="w-full text-black">
         <input
          value={store.searchEmail}
          onChange={(e) => store.triggerSearch((store.searchEmail = e.target.value))}
          className="w-full rounded bg-white px-2"
          placeholder="Search email"
         />
        </th>
        <th className="w-full text-black">
         <input
          value={store.searchName}
          onChange={(e) => store.triggerSearch((store.searchName = e.target.value))}
          className="w-full rounded bg-white px-2"
          placeholder="Find the user name"
         />
        </th>
        <th className="w-56 text-right">
         <span
          onClick={() => navigate('/0')}
          className="basic-btn float-right bg-orange-700 px-3 "
         >
          <i className="ri-add-box-fill"></i> new user
         </span>
        </th>
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
           <span
            onClick={() => navigate('/' + x.id)}
            className="basic-btn bg-sky-400 px-2 text-white"
           >
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

     {store.items.length == 0 && !store.loading && (
      <div className="w-full text-center">No items available</div>
     )}

     {store.loading && (
      <div className="inline-block w-full p-3 text-center">
       <i className="ri-loader-2-fill inline-block animate-spin"></i> Loading...
      </div>
     )}

     {store.hasMoreItems && !store.loading && (
      <div className="w-full">
       <span
        onClick={() => store.load(true)}
        className="flex w-full cursor-pointer select-none items-center justify-center gap-1 rounded bg-lime-600 p-2 text-white hover:opacity-80"
       >
        <i className="ri-download-2-fill"></i>Load more
       </span>
      </div>
     )}
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
