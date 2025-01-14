import React, { JSX, useEffect, useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import Store from './Store';

export default observer(({ store }: { store: Store }) => {
	return <div className="full flex flex-col">Prompts</div>;
});
