import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';

import { auth } from './lib/firebase';
import ThemeWrapper from './components/ThemeWrapper';
import LayoutMain from './components/LayoutMain';
import Home from './pages/Home';
import ChatRoom from './pages/ChatRoom';
import Login from './pages/Login';

function App() {
  const [user, loading] = useAuthState(auth);

  return (
    <div className="App">
      <ThemeWrapper>
        {loading || !user ? (
          <Login />
        ) : (
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<LayoutMain />}>
                <Route index element={<Home />} />
                <Route path=":roomId" element={<ChatRoom />} />
              </Route>
            </Routes>
          </BrowserRouter>
        )}
      </ThemeWrapper>
    </div>
  );
}

export default App;
