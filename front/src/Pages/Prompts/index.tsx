import React, { useCallback, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import Store from './Store';
import { Route, Switch } from 'wouter';
import Page404 from '@/Common/Page404';
import EditPrompt from './EditPrompt';
import EditCategory from './EditCategory';
import Confirmation from '@/Common/Confirmation';
import Search from '@/Pages/Prompts/Search.tsx';
import ResultView from '@/Pages/Prompts/ResultView';

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
    {store.resultViewStore.hasSelectedPrompt && (
     <ResultView store={store.resultViewStore} />
    )}
    {!store.resultViewStore.hasSelectedPrompt && (
     <>
      <Search store={store} />
      <EditPrompt store={store.editPromptModal} />
      <EditCategory store={store.editCategoryModal} />
      <Confirmation />
     </>
    )}
   </Route>
   <Route>
    <Page404 />
   </Route>
  </Switch>
 );
});
