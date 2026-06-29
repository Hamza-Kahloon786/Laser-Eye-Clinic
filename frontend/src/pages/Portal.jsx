import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar      from '../components/Sidebar';
import TopBar       from '../components/TopBar';
import Dashboard    from '../components/Dashboard';
import Appointments from '../components/Appointments';
import CalendarView from '../components/CalendarView';

export default function Portal({ user, onLogout }) {
  return (
    <div className="portal-layout">
      <Sidebar user={user} onLogout={onLogout}/>
      <div className="portal-main">
        <TopBar user={user}/>
        <div className="portal-content">
          <Routes>
            <Route index          element={<Dashboard/>}/>
            <Route path="appointments" element={<Appointments/>}/>
            <Route path="calendar"     element={<CalendarView/>}/>
            <Route path="*"           element={<Navigate to="/portal" replace/>}/>
          </Routes>
        </div>
      </div>
    </div>
  );
}