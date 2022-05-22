import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import {
  BrowserRouter,
  Route,
  Routes,
} from 'react-router-dom';
import { lazy } from './utils';
import './App.css';

const Details = lazy('src/pages/Details');
const Home = lazy('src/pages/Home');

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Suspense fallback={<span>loading</span>}>
        <Routes>
          <Route
            element={<Home />}
            path="/"
          />
          <Route
            element={<Details />}
            path="/details"
          />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

createRoot(document.querySelector('#root') as HTMLElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
