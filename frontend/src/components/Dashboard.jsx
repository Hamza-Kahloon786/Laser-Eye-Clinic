import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { List, Calendar, Clock, CheckCircle, Plus, Loader2 } from 'lucide-react';
import { appointmentAPI } from '../services/api';
import Badge from './Badge';

export default function Dashboard() {
  const [stats,   setStats]   = useState({ total:0, today:0, scheduled:0, completed:0 });
  const [recent,  setRecent]  = useState([]);
  const [todayA,  setTodayA]  = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const today = () => {
    const d = new Date();
    return [d.getFullYear(), String(d.getMonth()+1).padStart(2,'0'), String(d.getDate()).padStart(2,'0')].join('-');
  };

  useEffect(() => {
    const load = async () => {
      try {
        const [sRes, aRes] = await Promise.all([
          appointmentAPI.getStats(),
          appointmentAPI.getAll(),
        ]);
        setStats(sRes.data.stats);
        const all = aRes.data.appointments || [];
        setRecent(all.slice(0, 6));
        setTodayA(all.filter(a => a.date === today()).sort((a,b) => a.time.localeCompare(b.time)));
      } catch (e) { console.error(e); }
      finally { setLoading(false); }
    };
    load();
  }, []);

  const STAT_CARDS = [
    { label: 'Total Appointments', value: stats.total,     icon: <List size={18}/>,        bg:'#dbeafe', cl:'#1e40af' },
    { label: "Today's",            value: stats.today,     icon: <Calendar size={18}/>,    bg:'#dcfce7', cl:'#166534' },
    { label: 'Scheduled',          value: stats.scheduled, icon: <Clock size={18}/>,       bg:'#fef3c7', cl:'#92400e' },
    { label: 'Completed',          value: stats.completed, icon: <CheckCircle size={18}/>, bg:'#dbeafe', cl:'#1e40af' },
  ];

  if (loading) return (
    <div className="empty-state"><Loader2 size={32} style={{animation:'spin 1s linear infinite'}}/><p>Loading dashboard...</p></div>
  );

  return (
    <div>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      {/* Stats */}
      <div className="stats-grid">
        {STAT_CARDS.map(s => (
          <div className="stat-card" key={s.label}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:8}}>
              <div className="stat-label">{s.label}</div>
              <div className="stat-icon" style={{background:s.bg,color:s.cl}}>{s.icon}</div>
            </div>
            <div className="stat-value">{s.value}</div>
          </div>
        ))}
      </div>

      {/* Grid */}
      <div className="dash-grid">
        {/* Recent Appointments */}
        <div className="card">
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:16}}>
            <h3 style={{fontSize:15,fontWeight:600}}>Recent Appointments</h3>
            <button className="btn btn-sm" style={{background:'#eff6ff',color:'#1e40af',borderColor:'#bfdbfe'}} onClick={()=>navigate('/portal/appointments')}>
              View All →
            </button>
          </div>
          {recent.length === 0 ? (
            <div className="empty-state"><List size={28}/><p>No appointments yet</p></div>
          ) : recent.map(a => (
            <div className="recent-item" key={a._id}>
              <div style={{display:'flex',gap:10,alignItems:'center'}}>
                <div className="patient-avatar">{a.patientName.charAt(0)}</div>
                <div>
                  <div style={{fontWeight:600,fontSize:13}}>{a.patientName}</div>
                  <div style={{fontSize:11,color:'var(--text-muted)'}}>{a.service} · {a.date} {a.time}</div>
                </div>
              </div>
              <Badge status={a.status}/>
            </div>
          ))}
        </div>

        {/* Today Schedule */}
        <div className="card">
          <h3 style={{fontSize:15,fontWeight:600,marginBottom:14}}>Today's Schedule</h3>
          {todayA.length === 0 ? (
            <div className="empty-state"><Calendar size={26}/><p style={{fontSize:12}}>No appointments today</p></div>
          ) : todayA.map(a => (
            <div className="today-item" key={a._id}>
              <div className="today-time">{a.time}</div>
              <div className="today-patient">{a.patientName}</div>
              <div className="today-svc">{a.service}</div>
            </div>
          ))}
          <button className="btn btn-primary" style={{width:'100%',justifyContent:'center',marginTop:12}}
            onClick={()=>navigate('/portal/appointments')}>
            <Plus size={14}/> New Appointment
          </button>
        </div>
      </div>
    </div>
  );
}