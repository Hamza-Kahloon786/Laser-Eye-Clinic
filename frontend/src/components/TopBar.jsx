import { useLocation } from 'react-router-dom';

const TITLES = {
  '/portal':              'Dashboard',
  '/portal/appointments': 'Appointments',
  '/portal/calendar':     'Calendar',
};

export default function TopBar({ user }) {
  const location = useLocation();
  const title    = TITLES[location.pathname] || 'Portal';
  const date     = new Date().toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });
  return (
    <div className="topbar">
      <div>
        <div className="topbar-title">{title}</div>
        <div className="topbar-date">{date}</div>
      </div>
      <div className="topbar-welcome">Welcome, {user.name.split(' ').slice(-1)[0]} 👋</div>
    </div>
  );
}