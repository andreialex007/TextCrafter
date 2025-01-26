import React from 'react';
import { observer } from 'mobx-react-lite';
import Store from './Store';
import { Route } from 'wouter';

export default observer(({ store }: { store: Store }) => {
 return <div className="basic-page full flex flex-col">About the software page</div>;
});
