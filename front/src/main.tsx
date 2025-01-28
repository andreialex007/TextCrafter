import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { getLocalItem, initAxios } from '@/Common/Utils.ts';
import axios from 'axios';
import AuthStore from '@/Common/AuthStore.ts';

initAxios('http://127.0.0.1:8055');
AuthStore.refreshAxios();

createRoot(document.getElementById('root')!).render(
 <StrictMode>
  <App />
 </StrictMode>,
);
