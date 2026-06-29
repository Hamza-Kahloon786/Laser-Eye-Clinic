import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, AlertCircle, Loader2 } from 'lucide-react';
import { authAPI } from '../services/api';

export default function Login({ onLogin }) {
  const [form, setForm]       = useState({ username: '', password: '' });
  const [error, setError]     = useState('');
  const [loading, setLoading] = useState(false);
  const navigate              = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('[LOGIN] handleSubmit called, form:', form);
    if (!form.username || !form.password) { setError('Please fill in all fields'); return; }
    setLoading(true); setError('');
    try {
      console.log('[LOGIN] Calling authAPI.login...');
      const { data } = await authAPI.login(form);
      console.log('[LOGIN] Success:', data);
      onLogin(data.user, data.token);
      navigate('/portal');
    } catch (err) {
      console.error('[LOGIN] Error:', err.message, err.response?.data);
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-logo"><Eye size={28} color="#fff"/></div>
        <h2 className="login-title">Staff Portal</h2>
        <p className="login-sub">Sign in to manage appointments</p>

        {error && (
          <div className="alert alert-danger">
            <AlertCircle size={15}/> {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Username</label>
            <input className="form-input" value={form.username}
              onChange={e => setForm({...form, username: e.target.value})}
              placeholder="Enter username" autoComplete="username"/>
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input className="form-input" type="password" value={form.password}
              onChange={e => setForm({...form, password: e.target.value})}
              placeholder="Enter password" autoComplete="current-password"/>
          </div>
          <button type="submit" className="btn btn-primary" style={{width:'100%',padding:10,marginTop:4,justifyContent:'center'}} disabled={loading}>
            {loading ? <><Loader2 size={15} style={{animation:'spin 1s linear infinite'}}/> Signing in...</> : 'Sign In →'}
          </button>
        </form>

        <div className="demo-hint">
          <div className="demo-hint-title">Demo Credentials</div>
          <div className="demo-hint-row">Doctor: <strong>admin</strong> / admin123</div>
          <div className="demo-hint-row">Staff: <strong>staff</strong> / staff123</div>
        </div>
        <button onClick={() => navigate('/')} style={{width:'100%',marginTop:12,background:'none',border:'none',color:'var(--text-muted)',fontSize:12,cursor:'pointer'}}>
          ← Back to home
        </button>
      </div>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );
}