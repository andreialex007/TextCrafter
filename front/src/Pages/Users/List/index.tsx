import React from 'react';
import { observer } from 'mobx-react-lite';
import Store from './Store';

export default observer(({ store }: { store: Store }) => {
 return <div className="basic-page full flex flex-col">List of users</div>;
});
