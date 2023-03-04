import React from 'react';
import Home from './pages/Home';
import Signup from './pages/login/Signup';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Login from './pages/login/Login';
import { useContext } from 'react';
import { ResisterContext } from './context/ResisterContext';
import 'bootstrap/dist/css/bootstrap.css';

const App = () => {
  const { currentUser } = useContext(ResisterContext);

  // 사용자 인증 완료시 홈페이지 보이기
  const ProtectRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }

    return children;
  };

  return (
    <>
      <Router basename="react-chat">
        <div className="wrap">
          <Routes>
            {/* Route 6버전 부터 index기능 가능 */}
            <Route path="/">
              <Route
                index
                element={
                  <ProtectRoute>
                    <Home />
                  </ProtectRoute>
                }
              />
              <Route path="login" element={<Login />} />
              <Route path="resister" element={<Signup />} />
            </Route>
          </Routes>
        </div>
      </Router>
    </>
  );
};

export default App;
