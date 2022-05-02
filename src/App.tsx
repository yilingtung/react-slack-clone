import { BrowserRouter, Routes, Route } from 'react-router-dom';

import ThemeWrapper from './components/ThemeWrapper';
import LayoutMain from './components/LayoutMain';
import Home from './pages/Home';

import './App.css';

function App() {
  return (
    <div className="App">
      <ThemeWrapper>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LayoutMain />}>
              <Route index element={<Home />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeWrapper>
    </div>
  );
}

export default App;
