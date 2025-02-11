import React from 'react';
import { observer } from 'mobx-react-lite';
import LoginStore from './Store';
import { useLocation } from 'wouter';
import AuthStore from '@/Common/AuthStore.ts';
import LoginForm from './LoginForm.tsx';

export default observer(() => {
 let [, setLocation] = useLocation();

 if (AuthStore.isAuthenticated) {
  setLocation('/');
 }

 return (
  <div className="flex  min-h-screen flex-col items-center justify-center bg-gray-100">
   <div className=" flex w-fit flex-col gap-3 rounded-3xl bg-white p-5 shadow-2xl">
    <LoginForm />

    <span
     onClick={() => {
      LoginStore.handleLogin();
      setTimeout(() => location.reload(), 300);
     }}
     className="basic-btn align-center mt-3 min-w-full justify-center rounded-md bg-slate-500 p-2 px-3 text-white"
    >
     <i className="ri-login-box-fill"></i>
     Login
    </span>
   </div>
  </div>
 );
});
