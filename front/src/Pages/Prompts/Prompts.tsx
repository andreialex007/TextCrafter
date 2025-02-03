import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import Store from './Store';
import EditPrompt from './EditPrompt';
import EditCategory from './EditCategory';
import Confirmation from '../../Common/Confirmation';
import Search from './Search';
import ResultView from './ResultView';

export default observer(({ store }: { store: Store }) => {
 useEffect(() => {
  store.load();
 }, []);

 return (
  <>
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
  </>
 );
});
