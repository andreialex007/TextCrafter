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
    <div className="basic-page full flex flex-col"></div>
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
