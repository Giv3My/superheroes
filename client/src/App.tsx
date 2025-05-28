import { Route, Routes } from 'react-router';

import { ROUTES } from './common/constants';

import { Home, Edit, View } from './pages';
import './App.scss';

function App() {
  return (
    <>
      <Routes>
        <Route path={ROUTES.edit} element={<Edit />} />
        <Route path={ROUTES.view} element={<View />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
