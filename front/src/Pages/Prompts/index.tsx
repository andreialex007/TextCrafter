import React, { useCallback, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import Store from './Store';
import { Route, Switch } from 'wouter';
import Page404 from './../../Common/Page404';
import Prompts from './Prompts';

export default observer(({ store }: { store: Store }) => {
 useEffect(() => {
  store.load();
 }, []);

 return (
  <Switch>
   <Route path="/">
    <div className="full flex flex-col p-5 pb-0">
     <div>
      <textarea
       className="w-full resize-none rounded border bg-yellow-50 p-2 text-sm"
       rows={5}
       placeholder="Your text to experiment..."
       value={store.textExample}
       onChange={(e) => (store.textExample = e.target.value)}
       onKeyDown={(event) => event.stopPropagation()}
      />
     </div>
    </div>
    <Prompts store={store} />
   </Route>
   <Route>
    <Page404 />
   </Route>
  </Switch>
 );
});
