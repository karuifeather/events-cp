import { Navigate, Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import LocationDetails from './pages/LocationDetails';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/locations/:locationId" element={<LocationDetails />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
