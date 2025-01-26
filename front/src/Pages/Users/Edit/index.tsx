import React from 'react';
import { observer } from 'mobx-react-lite';
import Store from './Store';
import { useRoute, useParams, Route } from 'wouter';

export default observer(({ store }: { store: Store }) => {
 let params = useParams();

 return <div className="basic-page full flex flex-col">User details: {params.id}</div>;
});
