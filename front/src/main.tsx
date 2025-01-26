import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { Link, Route } from 'wouter';

function Home() {
 return <h1>Home</h1>;
}

function About() {
 return <h1>About</h1>;
}

export default function AppV2() {
 return (
  <div>
   <nav>
    <Link href="/">Home</Link>
    <Link href="/about">About</Link>
   </nav>
   <Route path="/" component={Home} />
   <Route path="/about" component={About} />
   <Route path="/:rest*">404</Route>
  </div>
 );
}

createRoot(document.getElementById('root')!).render(
 <StrictMode>
  <App />
 </StrictMode>,
);
