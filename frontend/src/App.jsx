import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Eye } from 'lucide-react';
import Landing  from './components/Landing';
import Login    from './components/Login';
import Portal   from './pages/Portal';
import { authAPI } from './services/api';

function LoadingScreen() {
  return (
    <div className="loading-screen">
      <div className="loading-content">
        <div className="loading-logo"><Eye size={28} color="#fff"/></div>
        <p>Usman Laser Eye Clinic</p>
      </div>
    </div>
  );
}

export default function App() {
  const [user,    setUser]    = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('clinic_token');
    if (token) {
      authAPI.getMe()
        .then(({ data }) => setUser(data.user))
        .catch(() => localStorage.removeItem('clinic_token'))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const handleLogin = (userData, token) => {
    localStorage.setItem('clinic_token', token);
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('clinic_token');
    setUser(null);
  };

  if (loading) return <LoadingScreen/>;

  return (
    <Routes>
      <Route path="/"         element={<Landing/>}/>
      <Route path="/login"    element={user ? <Navigate to="/portal" replace/> : <Login onLogin={handleLogin}/>}/>
      <Route path="/portal/*" element={user ? <Portal user={user} onLogout={handleLogout}/> : <Navigate to="/login" replace/>}/>
      <Route path="*"         element={<Navigate to="/" replace/>}/>
    </Routes>
  );
}