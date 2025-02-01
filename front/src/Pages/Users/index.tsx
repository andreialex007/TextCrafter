import React from 'react';
import { observer } from 'mobx-react-lite';
import Store from './Store';
import { Route, Switch } from 'wouter';
import Page404 from '@/Common/Page404';
import Edit from './Edit';
import EditDelRow from '@/Pages/Prompts/EditDelRow.tsx';

export default observer(({ store }: { store: Store }) => {
 return (
  <Switch>
   <Route path="/">
    <div className="basic-page w-full">
     <table className="w-full table-fixed">
      <thead className="font-normal text-white">
       <tr className="child:bg-slate-400 child:p-2 child:font-normal">
        <th className="w-16">
         <input className="w-full rounded bg-white px-2" placeholder="Id" />
        </th>
        <th className="w-1/4 ">
         <input className="w-full rounded bg-white px-2" placeholder="Search email" />
        </th>
        <th className=" w-full">
         <input
          className="w-full rounded bg-white px-2"
          placeholder="Find the user name"
         />
        </th>
        <th className="w-28"></th>
       </tr>
       <tr className="child:bg-slate-500 child:p-2">
        <th className="text-left">Id</th>
        <th className="text-left">Email</th>
        <th className="text-left">Name</th>
        <th className="text-right">Actions</th>
       </tr>
      </thead>
      <tbody>
       <tr>
        <td>55</td>
        <td>ivanov@ivanov.com</td>
        <td>Ivanov Ivan</td>
        <td></td>
       </tr>
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
