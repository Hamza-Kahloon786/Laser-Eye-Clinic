import { useLocation, useNavigate } from 'react-router-dom';
import { Eye, Home, List, Calendar, LogOut } from 'lucide-react';

const NAV = [
  { path: '/portal',              label: 'Dashboard',    icon: <Home size={16}/> },
  { path: '/portal/appointments', label: 'Appointments', icon: <List size={16}/> },
  { path: '/portal/calendar',     label: 'Calendar',     icon: <Calendar size={16}/> },
];

export default function Sidebar({ user, onLogout }) {
  const location = useLocation();
  const navigate = useNavigate();
  const active   = (p) => location.pathname === p;

  return (
    <aside className="sidebar">
      {/* Logo */}
      <div className="sidebar-logo">
        <div className="sidebar-logo-icon"><Eye size={19} color="#fff"/></div>
        <div className="sidebar-logo-text">
          <div className="name">Usman Laser Eye</div>
          <div className="sub">Clinic Portal</div>
        </div>
      </div>

      {/* Nav */}
      <nav className="sidebar-nav">
        <div className="sidebar-nav-label">MAIN MENU</div>
        {NAV.map(n => (
          <button key={n.path} className={`nav-item ${active(n.path) ? 'active' : ''}`}
            onClick={() => navigate(n.path)}>
            {n.icon} {n.label}
          </button>
        ))}
      </nav>

      {/* User */}
      <div className="sidebar-footer">
        <div className="sidebar-user">
          <div className="user-avatar">{user.ini}</div>
          <div>
            <div className="user-name">{user.name}</div>
            <div className="user-role">{user.role}</div>
          </div>
        </div>
        <button className="btn-logout" onClick={onLogout}>
          <LogOut size={13}/> Sign Out
        </button>
      </div>
    </aside>
  );
}