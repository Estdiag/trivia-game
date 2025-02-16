import { BrowserRouter, Routes, Route } from 'react-router';
import routes from './routes';
import { Suspense, useMemo } from 'react';

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
    <>
      <Suspense fallback={<>cargando</>}>
        <BrowserRouter>
          <Routes>{routesList}</Routes>
        </BrowserRouter>
      </Suspense>
    </>
  );
}

export default App;
