import React from 'react';
import { observer } from 'mobx-react-lite';
import Store from './Store';
import { Route } from 'wouter';

export default observer(({ store }: { store: Store }) => {
 return (
  <div className="basic-page full flex flex-col">
   <div>
    <strong>
     <i className="ri-aliens-fill "></i> Alien Software
    </strong>
    <span> 2025 ©</span>
   </div>
   <div className="text-sm italic">All rights reserved</div>
  </div>
 );
});
