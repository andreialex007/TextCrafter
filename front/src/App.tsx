import './App.css';
import { observer } from 'mobx-react-lite';
import AppStore, { allPages } from './AppStore';
import { Route, Router, Switch, useLocation } from 'wouter';
import Login from './Pages/Login';
import React from 'react';
import Page404 from './Common/Page404.tsx';

let store = new AppStore();

export default observer(() => {
 let [location, setLocation] = useLocation();
 let activePage = store.getActivePage(location);

 return (
  <Router>
   <div className="flex min-h-screen flex-col">
    {activePage && (
     <div className="inner-shadow flex flex-row bg-gray-100 shadow-md child:flex child:p-5">
      {store.navItems.map((item) => (
       <div
        key={item.url}
        onClick={(x) => setLocation(item.url)}
        className={
         'item-4 flex cursor-pointer items-center gap-1 px-6 hover:bg-gray-200' +
         ' ' +
         (item.isActive(location) ? 'active-item' : '')
        }
       >
        <i className={`ri-${item.icon}`}></i>
        {item.name}
       </div>
      ))}
      <div className="flex-grow"></div>
      <div
       onClick={() => setLocation('/login')}
       className="flex cursor-pointer items-center gap-1 p-4 px-6 hover:bg-gray-200"
      >
       Logout
       <i className="ri-arrow-right-up-box-fill"></i>
      </div>
     </div>
    )}
    <Switch>
     {allPages.map((x) => (
      <Route key={x.name} path={x.store.url} nest={x.store.url !== '/'}>
       <x.component store={x.store}></x.component>
      </Route>
     ))}
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
