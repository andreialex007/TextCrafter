import React from 'react';
import { observer } from 'mobx-react-lite';
import LoginStore from './Store';
import { useLocation } from 'wouter';
import AuthStore from '@/Common/AuthStore.ts';

export default observer(() => {
 let [, setLocation] = useLocation();

 if (AuthStore.isAuthenticated) {
  setLocation('/');
 }

 return (
  <div className="flex  min-h-screen flex-col items-center justify-center bg-gray-100">
   <div className=" flex w-fit flex-col gap-3 rounded-3xl bg-white p-5 shadow-2xl">
    <div className="form-control w-full max-w-xs">
     <label className="flex gap-0.5">
      <i className="ri-user-fill"></i>
      Login
     </label>
     <input
      type="text"
      placeholder="Login here"
      value={LoginStore.username}
      className="basic-input w-full max-w-xs"
      onChange={(e) => LoginStore.setUsername((e.target as any).value)}
     />
    </div>
    <div className="form-control w-full max-w-xs">
     <label className="flex gap-0.5">
      <i className="ri-key-fill"></i>
      Password
     </label>
     <input
      type="password"
      placeholder="Password here"
      value={LoginStore.password}
      className="basic-input"
      id="username w-full max-w-xs"
      onChange={(e) => LoginStore.setPassword((e.target as any).value)}
     />
    </div>
    <span
     onClick={() => setLocation('/')}
     className="basic-btn mt-3 rounded-md bg-slate-500 p-2 text-center text-white"
    >
     <i className="ri-login-box-fill"></i>
     Login
    </span>
   </div>
  </div>
 );
});
