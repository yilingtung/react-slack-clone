import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';

import ThemeWrapper from './components/ThemeWrapper';
import Home from './pages/Home';

import './App.css';

function App() {
  return (
    <div className="App">
      <ThemeWrapper>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Outlet />}>
              <Route index element={<Home />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeWrapper>
    </div>
  );
}

export default App;
