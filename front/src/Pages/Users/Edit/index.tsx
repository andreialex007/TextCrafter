import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import Store from './Store';
import { useParams, useLocation } from 'wouter';

export default observer(({ store }: { store: Store }) => {
 const [location, navigate] = useLocation();
 store.navigate = navigate;
 const params = useParams();
 const isNewUser = params.id === '0';

 useEffect(() => {
  if (params.id) {
   store.loadUser(params.id);
  }
 }, [params.id, store]);

 return (
  <div className="basic-page full flex flex-col">
   {store.loading ? (
    <div className="text-center">Loading...</div>
   ) : (
    <>
     <table>
      <tbody>
       <tr className="child:p-2">
        <td>ID:</td>
        <td className="font-bold">{isNewUser ? 'new user' : params.id}</td>
       </tr>
       <tr className="child:p-2">
        <td>Email</td>
        <td>
         <input
          value={store.user.email ?? ''}
          onChange={(e) => (store.user.email = e.target.value)}
          className="basic-input"
          placeholder="Email"
         />
        </td>
       </tr>
       <tr className="child:p-2">
        <td>Name:</td>
        <td>
         <input
          value={store.user.name ?? ''}
          onChange={(e) => (store.user.name = e.target.value)}
          className="basic-input"
          placeholder="Name"
         />
        </td>
       </tr>
       {/* Password field - only visible for new users */}
       {isNewUser && (
        <tr className="child:p-2">
         <td>Password:</td>
         <td>
          <input
           type="password"
           value={store.user.password ?? ''}
           onChange={(e) => (store.user.password = e.target.value)}
           className="basic-input"
           placeholder="Password"
          />
         </td>
        </tr>
       )}
       <tr className="child:p-2">
        <td>Role:</td>
        <td>
         <label className="inline-flex cursor-pointer items-center">
          <input
           type="checkbox"
           checked={store.user.role === 'admin'}
           onChange={(e) => (store.user.role = e.target.checked ? 'admin' : 'user')}
           className="peer sr-only"
          />
          <div className="peer relative h-6 w-11 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rtl:peer-checked:after:-translate-x-full dark:border-gray-600 dark:bg-gray-700 dark:peer-checked:bg-blue-600 dark:peer-focus:ring-blue-800"></div>
          <span className="ms-3 text-gray-900 dark:text-gray-300">Is Admin</span>
         </label>
        </td>
       </tr>
      </tbody>
     </table>
     <div className="flex w-full justify-end gap-2">
      <button
       className="basic-btn bg-red-500 px-4 py-2 text-white"
       onClick={() => navigate('/')}
      >
       <i className="ri-arrow-left-double-line"></i>
       Back
      </button>
      <button
       className="basic-btn bg-green-500 px-4 py-2 text-white"
       onClick={() => store.saveUser()}
      >
       <i className="ri-checkbox-circle-fill"></i>
       Save
      </button>
     </div>
    </>
   )}
  </div>
 );
});
