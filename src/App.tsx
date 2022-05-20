import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import {
  BrowserRouter,
  Route,
  Routes,
} from 'react-router-dom';
import { lazy } from './utils';
import './App.css';

function Details(): JSX.Element {
  const Inner = lazy('src/pages/Details');
  return (
    <Suspense fallback={<span>loading</span>}>
      <Inner />
    </Suspense>
  );
}

function Home(): JSX.Element {
  const Inner = lazy('src/pages/Home');
  return (
    <Suspense fallback={<span>loading</span>}>
      <Inner />
    </Suspense>
  );
}

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={<Home />}
          path="/"
        />
        <Route
          element={<Details />}
          path="/details/:scope/:id"
        />
      </Routes>
    </BrowserRouter>
  );
}

createRoot(document.querySelector('#root') as HTMLElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
