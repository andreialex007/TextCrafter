import './App.css';
import { observer } from 'mobx-react-lite';
import AppStore, { allPages } from './AppStore';
import { Route, Router, Switch, useLocation } from 'wouter';
import React, { useEffect } from 'react';
import Page404 from './Common/Page404.tsx';
import Login from '@/Pages/Login';
import AuthStore from '@/Common/AuthStore.ts';

let store = new AppStore();

export default observer(() => {
 let [location, setLocation] = useLocation();
 let activePage = store.getActivePage(location);

 if (!AuthStore.isAuthenticated && location !== '/login') {
  setLocation('/login');
  return null;
 }

 return (
  <Router>
   <div className="flex min-h-screen flex-col">
    {activePage && (
     <div className="inner-shadow flex flex-row bg-gray-100 shadow-md child:flex child:p-4">
      {store.navItems.map((item) => (
       <div
        key={item.url}
        onClick={(x) => setLocation(item.url)}
        className={
         'item-4 flex cursor-pointer items-center gap-1 px-6 hover:bg-gray-200 ' +
         (item.isActive(location) ? 'active-item' : '')
        }
       >
        <i className={`ri-${item.icon}`}></i>
        {item.name}
       </div>
      ))}
      <div className="flex-grow"></div>
      <div
       onClick={() => AuthStore.logout()}
       className="flex cursor-pointer items-center gap-1 p-4 px-6 hover:bg-gray-200"
      >
       {AuthStore.name}
       <i className="ri-arrow-right-up-box-fill"></i>
      </div>
     </div>
    )}
    <Switch>
     {store.navItems.map((navItem) => {
      const page = allPages.find((p) => p.name === navItem.name);
      if (!page) return null;

      return (
       <Route key={navItem.name} path={navItem.url} nest={navItem.url !== '/'}>
        <page.component store={navItem} />
       </Route>
      );
     })}
     <Route path="/login">
      <Login />
     </Route>
     <Route path="/:rest*">
      <Page404 />
     </Route>
    </Switch>
   </div>
  </Router>
 );
});
