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

  const ProtectRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }

    return children;
  };

  return (
    <>
      <Router basename="react-chat">
        <Routes>
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
            <Route path="register" element={<Signup />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
};

export default App;
