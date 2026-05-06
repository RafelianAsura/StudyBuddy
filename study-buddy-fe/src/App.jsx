import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Landing from './pages/Landing';
import MainLayout from './layouts/MainLayout';
import GuestLayout from './layouts/GuestLayout';

function App() {
  const [token, setToken] = useState(localStorage.getItem('user_token'));

  const handleLogout = async () => {
    const { default: authService } = await import('./services/authService');
    await authService.logout();
    setToken(null);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={!token ? <Landing /> : <Navigate to="/dashboard" />} />
        <Route path="/login" element={!token ? <Login onLoginSuccess={setToken} /> : <Navigate to="/dashboard" />} />
        <Route path="/signup" element={!token ? <Register /> : <Navigate to="/dashboard" />} />

        <Route
          path="/dashboard"
          element={token ? <MainLayout onLogout={handleLogout} /> : <GuestLayout />}
        >
          <Route index element={<Dashboard isGuest={!token} />} />
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
