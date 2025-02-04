import { observer } from 'mobx-react-lite';
import LoginStore from './Store.ts';
import React from 'react';

export default observer(() => {
 return (
  <>
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
  </>
 );
});
