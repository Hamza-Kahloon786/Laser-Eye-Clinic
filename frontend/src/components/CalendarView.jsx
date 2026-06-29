import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, CalendarDays, Clock, User, Stethoscope, Loader2 } from 'lucide-react';
import { appointmentAPI } from '../services/api';
import Badge from './Badge';

const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const WDAYS  = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

const STATUS_STYLE = {
  'Scheduled':   { dot:'#3b82f6', bg:'#eff6ff',  text:'#1d4ed8' },
  'In Progress': { dot:'#f59e0b', bg:'#fffbeb',  text:'#92400e' },
  'Completed':   { dot:'#10b981', bg:'#ecfdf5',  text:'#065f46' },
  'Cancelled':   { dot:'#ef4444', bg:'#fef2f2',  text:'#991b1b' },
};

const LEFT_BORDER = {
  'Scheduled':   '#3b82f6',
  'In Progress': '#f59e0b',
  'Completed':   '#10b981',
  'Cancelled':   '#ef4444',
};

export default function CalendarView() {
  const now = new Date();
  const [cur,     setCur]     = useState({ y: now.getFullYear(), m: now.getMonth() });
  const [sel,     setSel]     = useState(null);
  const [appts,   setAppts]   = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    appointmentAPI.getAll()
      .then(({ data }) => setAppts(data.appointments || []))
      .catch(e => console.error(e))
      .finally(() => setLoading(false));
  }, []);

  const daysInMonth = new Date(cur.y, cur.m + 1, 0).getDate();
  const firstDay    = new Date(cur.y, cur.m, 1).getDay();
  const isThisMonth = cur.y === now.getFullYear() && cur.m === now.getMonth();

  const dateStr = (d) =>
    `${cur.y}-${String(cur.m+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;

  const getAppts = (d) => appts.filter(a => a.date === dateStr(d));

  const monthAppts = appts.filter(a => {
    if (!a.date) return false;
    const [y, m] = a.date.split('-').map(Number);
    return y === cur.y && m - 1 === cur.m;
  });

  const selAppts = sel ? getAppts(sel) : [];

  const prev = () => { setSel(null); setCur(c => c.m === 0  ? { y: c.y-1, m: 11 } : { ...c, m: c.m-1 }); };
  const next = () => { setSel(null); setCur(c => c.m === 11 ? { y: c.y+1, m: 0  } : { ...c, m: c.m+1 }); };
  const goToday = () => { setSel(now.getDate()); setCur({ y: now.getFullYear(), m: now.getMonth() }); };

  const summaryRows = [
    { l:'Total',       v: monthAppts.length,                                        cl:'#60a5fa' },
    { l:'Scheduled',   v: monthAppts.filter(a=>a.status==='Scheduled').length,      cl:'#818cf8' },
    { l:'In Progress', v: monthAppts.filter(a=>a.status==='In Progress').length,    cl:'#fbbf24' },
    { l:'Completed',   v: monthAppts.filter(a=>a.status==='Completed').length,      cl:'#34d399' },
    { l:'Cancelled',   v: monthAppts.filter(a=>a.status==='Cancelled').length,      cl:'#f87171' },
  ];

  if (loading) return (
    <div style={{display:'flex',alignItems:'center',justifyContent:'center',height:320,color:'#94a3b8',gap:10}}>
      <Loader2 size={22} style={{animation:'spin 1s linear infinite'}}/> Loading calendar…
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );

  return (
    <div style={{display:'grid', gridTemplateColumns:'1fr 288px', gap:20, alignItems:'start'}}>

      {/* ── Main Calendar ─────────────────────────────── */}
      <div style={{background:'#fff', borderRadius:16, border:'1px solid #e2e8f0', boxShadow:'0 1px 4px rgba(0,0,0,0.05)', overflow:'hidden'}}>

        {/* Header */}
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', padding:'20px 24px', borderBottom:'1px solid #f1f5f9'}}>
          <button onClick={prev} style={navBtn}>
            <ChevronLeft size={16}/>
          </button>

          <div style={{textAlign:'center'}}>
            <div style={{fontSize:20, fontWeight:700, color:'#0f172a', letterSpacing:'-0.3px'}}>
              {MONTHS[cur.m]}
            </div>
            <div style={{fontSize:12, color:'#94a3b8', marginTop:1}}>{cur.y}</div>
          </div>

          <div style={{display:'flex', gap:8, alignItems:'center'}}>
            {!isThisMonth && (
              <button onClick={goToday} style={{...navBtn, fontSize:11, padding:'5px 10px', borderRadius:6, color:'#1d4ed8', borderColor:'#bfdbfe', background:'#eff6ff', width:'auto'}}>
                Today
              </button>
            )}
            <button onClick={next} style={navBtn}>
              <ChevronRight size={16}/>
            </button>
          </div>
        </div>

        {/* Weekday headers */}
        <div style={{display:'grid', gridTemplateColumns:'repeat(7,1fr)', padding:'14px 20px 6px'}}>
          {WDAYS.map(d => (
            <div key={d} style={{textAlign:'center', fontSize:11, fontWeight:600, color:'#cbd5e1', textTransform:'uppercase', letterSpacing:'0.6px'}}>
              {d}
            </div>
          ))}
        </div>

        {/* Days grid */}
        <div style={{display:'grid', gridTemplateColumns:'repeat(7,1fr)', gap:2, padding:'4px 12px 18px'}}>
          {Array.from({length: firstDay}).map((_,i) => <div key={`e${i}`}/>)}
          {Array.from({length: daysInMonth}).map((_,i) => {
            const d    = i + 1;
            const da   = getAppts(d);
            const isTd = isThisMonth && d === now.getDate();
            const isSel= sel === d;
            const hasAppts = da.length > 0;

            return (
              <div key={d} onClick={() => setSel(isSel ? null : d)}
                style={{
                  minHeight: 82,
                  borderRadius: 10,
                  padding: '8px 6px 6px',
                  cursor: 'pointer',
                  border: isSel
                    ? '2px solid #1d4ed8'
                    : hasAppts
                    ? '1px solid #e2e8f0'
                    : '1px solid transparent',
                  background: isSel ? '#eff6ff' : isTd ? '#f0f9ff' : hasAppts ? '#fafbfc' : 'transparent',
                  transition: 'all 0.12s',
                  position: 'relative',
                }}
                onMouseEnter={e => { if(!isSel) e.currentTarget.style.background = '#f8fafc'; e.currentTarget.style.border = '1px solid #e2e8f0'; }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = isSel ? '#eff6ff' : isTd ? '#f0f9ff' : hasAppts ? '#fafbfc' : 'transparent';
                  e.currentTarget.style.border = isSel ? '2px solid #1d4ed8' : hasAppts ? '1px solid #e2e8f0' : '1px solid transparent';
                }}
              >
                {/* Date number */}
                <div style={{display:'flex', justifyContent:'center', marginBottom:5}}>
                  <div style={{
                    width: 26, height: 26, borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: isTd ? '#1d4ed8' : 'transparent',
                    color: isTd ? '#fff' : isSel ? '#1d4ed8' : '#374151',
                    fontSize: 12,
                    fontWeight: isTd ? 700 : isSel ? 700 : 400,
                  }}>
                    {d}
                  </div>
                </div>

                {/* Appointment pills */}
                {da.slice(0,2).map((a, idx) => {
                  const s = STATUS_STYLE[a.status] || STATUS_STYLE['Scheduled'];
                  return (
                    <div key={idx} style={{
                      fontSize: 9, borderRadius: 4, padding: '2px 5px', marginBottom: 2,
                      background: s.bg, color: s.text,
                      overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis',
                      fontWeight: 600, lineHeight: 1.4,
                    }}>
                      {a.patientName}
                    </div>
                  );
                })}
                {da.length > 2 && (
                  <div style={{fontSize:9, color:'#94a3b8', textAlign:'center', marginTop:1}}>
                    +{da.length-2} more
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Side Panel ────────────────────────────────── */}
      <div style={{display:'flex', flexDirection:'column', gap:16}}>

        {/* Monthly Summary */}
        <div style={{background:'#0f172a', borderRadius:16, padding:'20px 20px 16px', boxShadow:'0 2px 8px rgba(0,0,0,0.15)'}}>
          <div style={{display:'flex', alignItems:'center', gap:8, marginBottom:18}}>
            <CalendarDays size={14} color="#60a5fa"/>
            <span style={{fontSize:12, fontWeight:600, color:'#60a5fa', textTransform:'uppercase', letterSpacing:'0.7px'}}>
              {MONTHS[cur.m]} Summary
            </span>
          </div>

          {summaryRows.map((r, i) => (
            <div key={r.l} style={{marginBottom: i === 0 ? 14 : 10}}>
              <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom: i === 0 ? 0 : 5}}>
                <span style={{fontSize:12, color: i === 0 ? '#94a3b8' : '#64748b'}}>{r.l}</span>
                <span style={{fontSize: i === 0 ? 22 : 13, fontWeight:700, color:r.cl}}>{r.v}</span>
              </div>
              {i === 0 && <div style={{height:'0.5px', background:'rgba(255,255,255,0.07)', margin:'10px 0 6px'}}/>}
              {i > 0 && monthAppts.length > 0 && (
                <div style={{height:3, background:'rgba(255,255,255,0.06)', borderRadius:2, overflow:'hidden'}}>
                  <div style={{height:'100%', width:`${Math.round((r.v / monthAppts.length)*100)}%`, background:r.cl, borderRadius:2, transition:'width 0.4s ease'}}/>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Selected date detail */}
        <div style={{background:'#fff', border:'1px solid #e2e8f0', borderRadius:16, padding:20, boxShadow:'0 1px 4px rgba(0,0,0,0.04)'}}>
          <div style={{fontSize:13, fontWeight:600, color:'#0f172a', marginBottom:14}}>
            {sel
              ? <>{MONTHS[cur.m]} <span style={{color:'#1d4ed8'}}>{sel}</span> — Appointments</>
              : 'Select a date'}
          </div>

          {!sel && (
            <div style={{textAlign:'center', padding:'28px 0', color:'#cbd5e1'}}>
              <CalendarDays size={34} style={{marginBottom:10, opacity:0.5}}/>
              <p style={{fontSize:12, color:'#94a3b8'}}>Click any date to view appointments</p>
            </div>
          )}

          {sel && selAppts.length === 0 && (
            <div style={{textAlign:'center', padding:'28px 0'}}>
              <CalendarDays size={28} style={{marginBottom:8, opacity:0.3, color:'#94a3b8'}}/>
              <p style={{fontSize:12, color:'#94a3b8'}}>No appointments on this day</p>
            </div>
          )}

          {selAppts.map(a => (
            <div key={a._id} style={{
              background:'#f8fafc', border:'1px solid #e2e8f0',
              borderLeft:`3px solid ${LEFT_BORDER[a.status] || '#3b82f6'}`,
              borderRadius:10, padding:'12px 14px', marginBottom:10,
            }}>
              <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:8}}>
                <div style={{fontWeight:600, fontSize:13, color:'#0f172a'}}>{a.patientName}</div>
                <Badge status={a.status}/>
              </div>
              <div style={{display:'flex', flexDirection:'column', gap:4}}>
                <div style={{display:'flex', alignItems:'center', gap:6, fontSize:11, color:'#64748b'}}>
                  <Clock size={11} color="#94a3b8"/> {a.time}
                </div>
                <div style={{display:'flex', alignItems:'center', gap:6, fontSize:11, color:'#64748b'}}>
                  <Stethoscope size={11} color="#94a3b8"/> {a.service}
                </div>
                <div style={{display:'flex', alignItems:'center', gap:6, fontSize:11, color:'#94a3b8'}}>
                  <User size={11} color="#94a3b8"/> {a.doctor}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );
}

const navBtn = {
  width: 34, height: 34, borderRadius: 8,
  border: '1px solid #e2e8f0', background: '#fff',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  cursor: 'pointer', color: '#64748b', transition: 'all 0.12s',
  flexShrink: 0,
};
