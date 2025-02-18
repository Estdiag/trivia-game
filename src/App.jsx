import { BrowserRouter, Routes, Route } from 'react-router';
import routes from './routes';
import { Suspense, useMemo } from 'react';
import Loading from './components/Loading';

function App() {
  const routesList = useMemo(
    () =>
      routes.map(route => (
        <Route
          key={route.path}
          path={route.path}
          element={<route.component />}
        />
      )),
    []
  );

  return (
    <div className="p-(--padding) md:h-screen w-screen max-w-full overflow-hidden">
      <Suspense fallback={<Loading/>}>
        <BrowserRouter>
          <Routes>{routesList}</Routes>
        </BrowserRouter>
      </Suspense>
    </div>
  );
}

export default App;
// p-[var(--padding)]